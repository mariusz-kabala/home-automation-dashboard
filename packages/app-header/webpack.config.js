const webpackSetup = require('../../webpack.config')
const deps = require('./package.json').dependencies;

module.exports = webpackSetup({
  deps,
  entry: './src/index',
  port: 3004,
  name: 'header_remote',
  filename: 'header.js',
  appName: 'HeaderApp'
})
