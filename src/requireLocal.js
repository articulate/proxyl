const { compose, partialRight } = require('ramda')

const resolveLocal =
  partialRight(require.resolve, [{ paths: [ process.cwd() ] }])

const requireLocal =
  compose(require, resolveLocal)

module.exports = requireLocal
