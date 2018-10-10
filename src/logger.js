const { compose, dissocPath } = require('ramda')
const paperplane = require('paperplane')

const logger =
  compose(paperplane.logger, dissocPath(['req', 'headers']))

module.exports = logger
