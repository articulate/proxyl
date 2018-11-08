const { composeP, evolve, prop, when } = require('ramda')
const http = require('http')
const { logger, mount } = require('paperplane')
const { resolve } = require('@articulate/funky')

const authWith       = require('./authWith')
const requestToEvent = require('./requestToEvent')
const requireLocal   = require('./requireLocal')

const noop = logger // Function.prototype
const port = Number(process.argv[2])

const [ handlerPath, handlerName ] = process.argv[3].split('.')
const handler = requireLocal(handlerPath)[handlerName]

let authorizer = resolve

if (process.argv[4]) {
  const [ authPath, authName ] = process.argv[4].split('.')
  authorizer = authWith(requireLocal(authPath)[authName])
}

const bufferize = body =>
  new Buffer(body, 'base64')

const decode64 =
  when(prop('isBase64Encoded'), evolve({ body: bufferize }))

const app =
  composeP(decode64, handler, requestToEvent, authorizer)

const listening = err => {
  if (err) console.error(err)
  else console.log(`Serving handler \`${handlerName}\` from ${handlerPath}.js on port ${port}`)
}

http.createServer(mount({ app, cry: noop, logger: noop }))
  .listen(port, listening)
