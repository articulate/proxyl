const { compose } = require('ramda')
const http = require('http')
const { mount } = require('paperplane')

const requestToEvent = require('./requestToEvent')

const [ path, name ] = process.argv[2].split('.')

const handlerPath = require.resolve(path, { paths: [ process.cwd() ] })
const handler = require(handlerPath)[name]

const app = compose(handler, requestToEvent)
const noop = Function.prototype

const listening = err => {
  if (err) console.error(err)
  else console.log(`Serving handler \`${name}\` from ${path}.js`)
}

http.createServer(mount({ app, cry: noop, logger: noop }))
  .listen(3000, listening)
