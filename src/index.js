#!/usr/bin/env nodemon

const { compose } = require('ramda')
const http = require('http')
const { mount } = require('paperplane')

const logger = require('./logger')
const requestToEvent = require('./requestToEvent')

const [ path, name ] = process.argv0.split('.')
const handlerPath = require.resolve(path, { paths: [ process.cwd() ] })
const handler = require(handlerPath)[name]

const app = compose(handler, requestToEvent)

http.createServer(mount({ app, logger }))
