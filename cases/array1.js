'use strict'
const help = require('../lib/help')

function cases (size, type) {
  function createArray () {
    return help.createArray(size, type)
  }

  return {
    'for index n (let)': () => {
      const a = createArray()
      let b
      const n = a.length
      for (let i = 0; i < n; i++) {
        b = a[i]
      }
    },

    'for index n (var)': () => {
      const a = createArray()
      let b
      const n = a.length
      for (let i = 0; i < n; i++) {
        b = a[i]
      }
    },

    'for index (var)': () => {
      const a = createArray()
      let b
      for (let i = 0; i < a.length; i++) {
        b = a[i]
      }
    },

    'for index (let)': () => {
      const a = createArray()
      let b
      for (let i = 0; i < a.length; i++) {
        b = a[i]
      }
    },

    'for of (const)': () => {
      const a = createArray()
      let b
      for (const i of a) {
        b = i
      }
    },

    'for of (let)': () => {
      const a = createArray()
      let b
      for (let i of a) {
        b = i
      }
    },

    'for of (var)': () => {
      const a = createArray()
      let b
      for (var i of a) {
        b = i
      }
    },
    
    foreach: () => {
      const a = createArray()
      let b
      a.forEach((i) => {
        b = i
      })
    },

    reduce: () => {
      const a = createArray()
      let b
      a.reduce((t, i) => {
        b = i
      }, 0)
    },

    map: () => {
      const a = createArray()
      let b
      a.map((i) => {
        b = i
      })
    },

    'for in': () => {
      const a = createArray()
      let b
      for (const i in a) {
        b = a[i]
      }
    },

  }
}

module.exports = cases
