module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // space before function parenthesis
    'space-before-function-paren': 'off',
    'no-irregular-whitespace': 'off',
    'no-async-promise-executor': 'off',
    'no-mixed-spaces-and-tabs': 'off',
    'no-useless-escape': 'off',
    'no-prototype-builtins': 'off',
    'no-unused-vars': 'off',
    'object-curly-spacing': 'off'
  }
};
