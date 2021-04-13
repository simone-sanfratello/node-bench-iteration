'use strict'

const path = require('path')
const fs = require('fs').promises
const si = require('systeminformation')
const prettyBytes = require('pretty-bytes')

async function report(dir, keys, subject) {
  const files = await fs.readdir(dir)

  const tasks = []
  const report = {}
  for (const key of keys) {
    report[key] = {
      results: [],
      fastests: []
    }
  }
  const records = []

  for (const file of files) {
    tasks.push((async () => {
      const current = path.join(dir, file)
      const ext = path.extname(file)
      const stat = await fs.lstat(current)
      if (stat.isFile() && file.startsWith(subject) && ext === '.json') {
        const info = file.match(/^(?<subject>\w+)\-(?<version>v1\d)-(?<size>1e\+\d)-(?<type>\w+)-/)
        const { version, size, type } = info.groups
        const content = require(current)
        records.push({ ...content, version, size, type })
        for (const result of content.results) {
          const { ops, margin } = result
          report[result.name].results.push({
            version, size, type, ops, margin
          })
        }
        report[content.fastest.name].fastests.push({
          version, size, type
        })
      }
    })())
  }
  await Promise.all(tasks)

  await fs.writeFile(path.join(dir, `../../report/${subject}/report.js`), `report.${subject} = ` + JSON.stringify(report, null, 2), 'utf8')
  await fs.writeFile(path.join(dir, `../../report/${subject}/records.js`), `records.${subject} = ` + JSON.stringify(records, null, 2), 'utf8')

  let system = await si.system()
  const cpu = await si.cpu()
  system = {
    system: { manufacturer: system.manufacturer, model: system.model },
    cpu: { manufacturer: cpu.manufacturer, brand: cpu.brand },
    memory: prettyBytes((await si.mem()).total)
  }

  // await fs.writeFile(path.join(dir, `../../report/system.js`), 'const system = ' + JSON.stringify(system, null, 2), 'utf8')
}

module.exports = {
  report
}
