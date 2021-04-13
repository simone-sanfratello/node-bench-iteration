const backgroundColor = [
  'rgb(31, 119, 180)',
  'rgb(255, 127, 14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(152, 223, 138)',
  'rgb(255, 152, 150)',
  'rgb(247, 182, 210)',
  'rgb(148, 103, 189)',
  'rgb(196, 156, 148)',
  'rgb(197, 176, 213)',
  'rgb(174, 199, 232)',
  'rgb(127, 127, 127)',
  'rgb(199, 199, 199)',
  'rgb(188, 189, 34)',
  'rgb(255, 187, 120)',
  'rgb(219, 219, 141)',
  'rgb(23, 190, 207)',
  'rgb(158, 218, 229)'
]
const charts = []

function avg(array) {
  return array.reduce((t, v) => t + v, 0) / array.length
}

function drawChart() {
  charts.forEach(c => c.destroy())

  const canvasOps = document
    .getElementById("chart-ops")
    .getContext("2d")

  const filter = getFilter()
  const dataOps = setupDataOps(filter)

  const configOps = {
    type: 'bar',
    data: dataOps,
    options: {
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'total operations'
        },
        tooltip: {
          callbacks: {
            footer: tooltip,
          }
        }
      },
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true
        }
      }
    },
  }

  charts.push(new Chart(canvasOps, configOps))
}

function tooltip(items) {
  return `Margin ± ${margin[items[0].label].toFixed(3)} %`;
};

let margin
function setupDataOps({ subject, version, size, type }) {
  const data = {
    ops: {},
    margin: {}
  }
  margin = {}
  const r = report[subject]
  for (const key in r) {
    data.ops[key] = Math.round(r[key]
      .results
      .filter(row => version == '*' || version.includes(row.version))
      .filter(row => size == '*' || size.includes(row.size))
      .filter(row => type == '*' || type.includes(row.type))
      .reduce((t, row) => t + row.ops, 0))
    margin[key] = avg(r[key]
      .results
      .filter(row => version == '*' || version.includes(row.version))
      .filter(row => size == '*' || size.includes(row.size))
      .filter(row => type == '*' || type.includes(row.type))
      .map(r => r.margin))
    data.margin[key] = Math.round(margin[key] * data.ops[key] / 100)
  }

  const ops = Object.fromEntries(Object.entries(data.ops).sort((a, b) => b[1] - a[1]))

  const labels = Object.keys(ops)
  return {
    labels,
    datasets: [
      {
        label: 'ops/sec',
        data: Object.values(ops),
        backgroundColor,
        borderColor: [],
        borderWidth: 0
      },
      {
        label: 'margin',
        data: Object.values(data.margin),
        backgroundColor: 'grey',
        borderColor: [],
        borderWidth: 0
      }
    ],
  }
}

function printSystem() {
  document.getElementById('system-content').innerHTML = JSON.stringify(system, null, 2)
}

function getFilter() {
  const filter = {}

  for (const part of ['version', 'size', 'type']) {
    const values = document.querySelectorAll(`input[name="${part}"]:checked`)
    const inputs = document.querySelectorAll(`input[name="${part}"]`)
    if (values.length == inputs.length) {
      filter[part] = '*'
      continue
    }

    filter[part] = []
    for (const selected of values) {
      filter[part].push(selected.value)
    }
  }

  filter.subject = document.querySelector('input[name="subject"]:checked').value;

  return filter
}

function formatNumber(num) {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')
}

function printRecords() {
  const output = []
  const { subject, version, size, type } = getFilter()

  const r = records[subject]
    .filter(row => version == '*' || version.includes(row.version))
    .filter(row => size == '*' || size.includes(row.size))
    .filter(row => type == '*' || type.includes(row.type))

  for (const record of r) {
    output.push(
      `<table>
      <tr>
        <th class="title" colspan="99">${record.name}</th>
      </tr>
      ${record.results.map(result => {
        let response = ''
        let fastest, slowest
        if (result.name === record.fastest.name) {
          fastest = true
          response = 'fastest'
        } else if (result.name === record.slowest.name) {
          slowest = true
          response = `slowest, ${result.percentSlower}% slower`
        } else {
          response = `${result.percentSlower}% slower`
        }

        const _class = fastest ? 'fastest' : slowest ? 'slowest' : ''
        return `
        <tr class="${_class}">
          <th class="name">${result.name}</th>
          <td class="ops">${formatNumber(result.ops)} ops/s, ±${result.margin}%</td>
          <td class="response">${response}</td>
        </tr>
        `
      }).join('')}
    </table>
    `)
  }


  document.getElementById('records-content').innerHTML = output.join('\n\n')
}

function print() {
  drawChart()
  printSystem()
  printRecords()
}

function init() {
  const url = new URL(window.location.href)
  const subject = url.searchParams.get('subject')
  if (subject) {
    document.querySelector(`input[name="subject"][value="${subject}"]`).checked = true
  }
  print()
}

init()
