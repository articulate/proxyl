#!/usr/bin/env nodemon

const { compose } = require('ramda')
const http = require('http')
const { mount } = require('paperplane')

const requestToEvent = require('./requestToEvent')

const [ path, name ] = process.argv[2].split('.')
console.log(`Loading handler \`${name}\` from ${path}.js`)

const handlerPath = require.resolve(path, { paths: [ process.cwd() ] })
const handler = require(handlerPath)[name]

const app = compose(handler, requestToEvent)
const noop = Function.prototype

http.createServer(mount({ app, cry: noop, logger: noop })).listen(3000)
