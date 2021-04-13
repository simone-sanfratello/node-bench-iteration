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
      for (let i = 0; i < a.length; ++i) {
        b = a[i]
      }
    },

    'for index n (let) ++i': () => {
      const a = createArray()
      let b
      const n = a.length
      for (let i = 0; i < n; ++i) {
        b = a[i]
      }
    },

    'for index n (var) ++i': () => {
      const a = createArray()
      let b
      const n = a.length
      for (let i = 0; i < n; ++i) {
        b = a[i]
      }
    },

    'for index (var) ++i': () => {
      const a = createArray()
      let b
      for (let i = 0; i < a.length; ++i) {
        b = a[i]
      }
    },

    'for index (let) ++i': () => {
      const a = createArray()
      let b
      for (let i = 0; i < a.length; ++i) {
        b = a[i]
      }
    },

  }
}

module.exports = cases
