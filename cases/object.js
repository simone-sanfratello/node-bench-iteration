'use strict'
const help = require('../lib/help')

function cases (size, type) {
  function createObject () {
    return help.createObject(size, type)
  }

  return {

    'object for entries': () => {
      let r
      const o = createObject()
      const entries = Object.entries(o)
      const n = entries.length
      for (let i = 0; i < n; i++) {
        const e = entries[i]
        r = e[0]
        r = e[1]
      }
    },
    
    'object for keys': () => {
      let r
      const o = createObject()
      const keys = Object.keys(o)
      const n = keys.length
      for (let i = 0; i < n; i++) {
        const key = keys[i]
        r = o[key]
      }
    },
    
    'object in': () => {
      let r
      const o = createObject()
      for (const i in o) {
        r = i
        r = o[i]
      }
    },
  }
}

module.exports = cases
