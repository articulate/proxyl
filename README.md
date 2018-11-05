# proxyl
[![npm version](https://img.shields.io/npm/v/proxyl.svg)](https://www.npmjs.com/package/proxyl)
[![npm downloads](https://img.shields.io/npm/dm/proxyl.svg)](https://www.npmjs.com/package/proxyl)

AWS API Gateway + Lambda proxy integration dev server.

Lifts your Lambda function into a web server that mimics the request/response format of an [API Gateway proxy integration](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html).  Reloads on file changes with the power of [nodemon](https://nodemon.io/).

## Usage

```
Usage: proxyl [options] path/to/file.handlerName

Options:
  -a, --auth <authorizer>  path/to/authorizer.handlerName (default: "")
  -p, --port <port>        Port to listen on (default: 3000)
  -w, --watch <path>       Path(s) to watch, defaults to pwd (default: [])
  -h, --help               output usage information
```

The `path/to/file.handlerName` should be the same as the `handler` option specified for your Lambda function.

The `-a` option allows you to register a [Lambda authorizer](https://docs.aws.amazon.com/apigateway/latest/developerguide/apigateway-use-lambda-authorizer.html).  To keep things simple, `proxyl`:

- Only supports `TOKEN` type authorizers, with the token in the `authorization` header.
- Will not cache the output of your authorizer.
- Will only `403` for a policy with `"Effect": "Deny"`, regardless of the `"Resource"`.

Any `"context"` included in the returned policy will be added to the request as [`event.requestContext.authorizer`](https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format) to simulate how that works in a real API Gateway.

Feel free to watch multiple paths with multiple `-w` options, like this:

```
proxyl -w dist -w src src/index.handler
```
