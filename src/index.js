#!/usr/bin/env node

const { append, curryN, flatten, map, pair, pipe } = require('ramda')
const path = require('path')
const program = require('commander')

const resolve =
  curryN(2, path.resolve)(process.cwd())

program
  .usage('[options] path/to/file.handlerName')
  .option('-w, --watch <path>', 'Path to watch, defaults to pwd', append, [])
  .parse(process.argv)

const watch = program.watch.length ? program.watch : ['.']

const args =
  pipe(
    map(pipe(
      resolve,
      pair('-w')
    )),
    flatten,
    append(require.resolve('./proxyl')),
    append(program.args),
    flatten
  )(watch)

const nodemon = require('child_process').spawn('nodemon', args)

nodemon.stderr.pipe(process.stderr)
nodemon.stdout.pipe(process.stdout)
