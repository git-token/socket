const GitTokenSocketServer = require('../dist/index').default
const config = require('../config')

const server = new GitTokenSocketServer(config)
