const { compose, concat, partialRight } = require('ramda')

const resolveLocal =
  partialRight(require.resolve, [{ paths: [ process.cwd() ] }])

const requireLocal =
  compose(require, resolveLocal, concat('./'))

module.exports = requireLocal
