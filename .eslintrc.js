module.exports = {
  'env': {
    'browser': true,
    'es6': true,
    'mocha': true,
    'node': true
  },
  'extends': 'eslint:recommended',
  'globals': {
    'expect': true
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'linebreak-style': ['error', 'unix'],
    'no-console': 'off',
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    'semi': ['error', 'never']
  }
}
