'use strict'

const SUBJECT = process.argv[2]

const path = require('path')
const { report } = require('./lib/report')
const cases = require('./cases/'+ SUBJECT)()

async function main() {
  await report(path.join(__dirname, 'benchmark/results'), Object.keys(cases), SUBJECT)
}

main()

