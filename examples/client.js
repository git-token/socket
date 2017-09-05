const GitTokenSocketClient = require('../dist/client.js').default
const config = require('../config')

const gittoken = new GitTokenSocketClient(config)

gittoken.on('data', (contract) => {
  console.log('contract', contract)
})
