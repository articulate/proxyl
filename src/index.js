#!/usr/bin/env node

const { append, curryN, map } = require('ramda')
const logger = require('nodemon/lib/utils/log')
const path = require('path')
const program = require('commander')

const log = ({ type, message }) =>
  logger[type](message)

const resolve =
  curryN(2, path.resolve)(process.cwd())

program
  .usage('[options] path/to/file.handlerName')
  .option('-w, --watch <path>', 'Path to watch, defaults to pwd', append, [])
  .parse(process.argv)

const watch = program.watch.length ? program.watch : ['.']

require('nodemon')({
  execArgs: program.args,
  script: require.resolve('./proxyl'),
  watch: map(resolve, watch)
}).on('log', log)
