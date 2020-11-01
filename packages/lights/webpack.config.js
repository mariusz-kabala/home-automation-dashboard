const webpackSetup = require('../../webpack.config')
const deps = require('./package.json').dependencies;

module.exports = webpackSetup({
  deps,
  entry: './src/index',
  port: 3002,
  name: 'lights_remote',
  filename: 'lights.js',
  appName: 'LightsApp'
})
