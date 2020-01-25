'use strict'

process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('../config/webpack.config.dev')

const port = parseInt(process.env.PORT, 10) || 8080
const host = process.env.HOST || '0.0.0.0'

const options = {
  host,
  port,
  hot: true,
  inline: true,
}

WebpackDevServer.addDevServerEntrypoints(config, options)
const compiler = webpack(config)
const server = new WebpackDevServer(compiler, options)

server.listen(port, host, () => {
  console.log(`Starting server on ${host}:${port}`)
})

const close = () => {
  server.close()
  process.exit()
}

process.on('SIGINT', close)
process.on('SIGTERM', close)
