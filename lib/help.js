'use strict'

const { spawn } = require('child_process')

const array = {
  STRING: (size) => {
    const a = []
    for (let i = 0; i < size; i++) {
      a.push('abcdefghijklmnopqrstuvwxyz' + i)
    }
    return a
  },
  NUMBER: (size) => {
    const a = []
    for (let i = 0; i < size; i++) {
      a.push(i)
    }
    return a
  },
  OBJECT: (size) => {
    const a = []
    for (let i = 0; i < size; i++) {
      a.push({ a: 1, b: 'two' })
    }
    return a
  },
  DATE: (size) => {
    const a = []
    for (let i = 0; i < size; i++) {
      a.push(new Date())
    }
    return a
  },
  MIX: (size) => {
    const a = []
    for (let i = 0; i < size; i++) {
      switch (i % 4) {
        case 0:
          a.push('onetwothree')
          break
        case 1:
          a.push(i)
          break
        case 2:
          a.push({ a: 0, b: 'string' })
          break
        case 3:
          a.push(new Date())
          break
      }
    }
    return a
  }
}

const object = {
  STRING: (size) => {
    const o = {}
    for (let i = 0; i < size; i++) {
      o["abcdefghijklmnopqrstuvwxyz" + i] = "abcdefghijklmnopqrstuvwxyz"+i
    }
    return o
  },
  NUMBER: (size) => {
    const o = {}
    for (let i = 0; i < size; i++) {
      o[i] = i
    }
    return o
  },
  OBJECT: (size) => {
    const o = {}
    for (let i = 0; i < size; i++) {
      o[i] = { a: 1, b: 'two' }
    }
    return o
  },
  DATE: (size) => {
    const o = {}
    for (let i = 0; i < size; i++) {
      o[i] = new Date()
    }
    return o
  },
  MIX: (size) => {
    const o = {}
    for (let i = 0; i < size; i++) {
      switch (i % 4) {
        case 0:
          o[i] = 'onetwothree'
          break
        case 1:
          o[i] = i
          break
        case 2:
          o[i] = { a: 0, b: 'string' }
          break
        case 3:
          o[i] = new Date()
          break
      }
    }
    return a
  }
}

function createArray (size, type) {
  return array[type](size)
}

function createObject (size, type) {
  return object[type](size)
}

function run (...args) {
  return new Promise(resolve => {
    const p = spawn('node', args, { stdio: ['ignore', 'inherit', 'inherit'] })

    p.on('close', () => {
      resolve()
    })
  })
}

module.exports = {
  run,
  createArray,
  createObject
}
