const { compose } = require('ramda')
const http = require('http')
const { mount } = require('paperplane')

const requestToEvent = require('./requestToEvent')

const [ path, name ] = process.argv[2].split('.')
const port = Number(process.argv[3])

const handlerPath = require.resolve(path, { paths: [ process.cwd() ] })
const handler = require(handlerPath)[name]

const app = compose(handler, requestToEvent)
const noop = Function.prototype

const listening = err => {
  if (err) console.error(err)
  else console.log(`Serving handler \`${name}\` from ${path}.js on port ${port}`)
}

http.createServer(mount({ app, cry: noop, logger: noop }))
  .listen(port, listening)
