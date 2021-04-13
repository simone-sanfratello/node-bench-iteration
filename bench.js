'use strict'

const SUBJECT = process.argv[2]
const SCRIPT = 'iterate'

const help = require('./lib/help')

// variants

const SIZES = [1e1, 1e2, 1e3, 1e4, 1e5, 1e6]
const TYPES = ['STRING', 'NUMBER', 'OBJECT', 'DATE', 'MIX']
const TIMES = 10

async function main () {
  for (const size of SIZES) {
    for (const type of TYPES) {
      for (let i = 1; i <= TIMES; i++) {
        await help.run(SCRIPT, SUBJECT, size, type, i < 10 ? `0${i}` : i)
      }
    }
  }
}

main()
