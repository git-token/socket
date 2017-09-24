const GitTokenSocketServer = require('../dist/server/index').default
const config = require('../config')

const server = new GitTokenSocketServer(config)
