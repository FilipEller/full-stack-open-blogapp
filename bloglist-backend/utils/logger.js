const colors = require('colors') // eslint-disable-line

const success = (...params) => {
  console.log(...params.map(s => (s ? s.green : s)))
}

const info = (...params) => {
  console.log(...params)
}

const error = (...params) => {
  console.error(...params.map(s => (s ? s.red : s)))
}

module.exports = { success, info, error }
