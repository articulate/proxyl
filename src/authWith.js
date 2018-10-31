const { assocPath, curry, flip, path, prop } = require('ramda')
const { assemble, tapP } = require('@articulate/funky')

const addTo = req =>
  flip(assocPath(['requestContext', 'authorizer']))(req)

const authorize = res =>
  res.policyDocument.Statement[0].Effect === 'Allow' ||
  Promise.reject({ statusCode: 403 })

const authorizationToken =
  path(['headers', 'authorization'])

const methodArn = req =>
  `arn:aws:execute-api:aws-region:account-id:api-id/stage-name/${req.method}${req.pathname}`

const buildAuthInput =
  assemble({ authorizationToken, methodArn, type: 'TOKEN' })

const authWith = (authorizer, req) =>
  Promise.resolve(req)
    .then(buildAuthInput)
    .then(authorizer)
    .then(tapP(authorize))
    .then(prop('context'))
    .then(addTo(req))

module.exports = curry(authWith)
