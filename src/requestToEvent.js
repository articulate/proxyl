const { compose, pick } = require('ramda')
const { renameAll } = require('@articulate/funky')

const cleanRequest =
  pick([
    'body',
    'headers',
    'method',
    'pathname',
    'query'
  ])

const formatEvent =
  renameAll({
    method: 'httpMethod',
    pathname: 'path',
    query: 'queryStringParameters'
  })

const requestToEvent =
  compose(formatEvent, cleanRequest)

module.exports = requestToEvent
