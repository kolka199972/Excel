module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      configFile: './babel.config.json',
    }
  },
  env: {
    'browser': true,
    'node': true,
    'es6': true,
    'jest/globals': true
  },
  extends: ['eslint:recommended', 'google'],
  rules: {
    'semi': 'off',
    'comma-dangle': 'off',
    'linebreak-style': 'off',
    'max-len': 'off',
    'arrow-parens': 'off',
    'object-curly-spacing': 'off',
    'require-jsdoc': 'off',
    'operator-linebreak': 'off'
  },
  plugins: ['jest']
}
