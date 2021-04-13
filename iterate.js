'use strict'

const SUBJECT = process.argv[2]

const b = require('benny')
const shuffle = require('array-shuffle')
const cases = require('./cases/' + SUBJECT)

const options = {
  // minSamples: 50
}

const SIZE = parseInt(process.argv[3])
const TYPE = process.argv[4]
const RUN = process.argv[5]

const version = process.version.match(/v(\d\d)/)[1]

const file = `${SUBJECT}-v${version}-${SIZE.toExponential()}-${TYPE}-${RUN}`
const _cases = cases(SIZE, TYPE)

b.suite(...[
  `Iterate ${SUBJECT} | version ${version} | size ${SIZE.toExponential()} | type ${TYPE} | run #${RUN}`,
  ...shuffle(Object.keys(_cases))
    .map(label => b.add(label, _cases[label], options)),
  b.cycle(),
  b.complete(),
  b.save({ file }),
  // b.save({ file, format: 'chart.html' })
]
)
