module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  plugins: ['import', 'promise', 'compat', 'node'],
  extends: [
    'plugin:promise/recommended',
    'standard'
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 9,
    ecmaFeatures: {
      sourceType: 'module',
      jsx: true
    },
    allowImportExportEverywhere: true
  },
  rules: {
    'promise/always-return': 0,
    'promise/avoid-new': 0,
    'promise/catch-or-return': 1,
    'compat/compat': 1,
    'node/no-deprecated-api': 2,
    'node/no-extraneous-require': 2,
    'node/no-missing-require': 2,
    'import/no-unresolved': [0, { commonjs: true, amd: true }],
    'import/named': 2,
    'import/namespace': 2,
    'import/default': 2,
    'import/export': 2,
    'import/no-webpack-loader-syntax': 1,
    'no-console': 1,
    'no-unused-vars': 1,
    'curly': 0
  }
}
