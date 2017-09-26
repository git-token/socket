import Websocket from 'ws'
import EventEmitter from 'events'

export default class GitTokenSocketClient extends EventEmitter {
  constructor({ socketUri }) {
    super()
    this.socket = new Websocket(socketUri)
    this.socket.on('open', () => {
      this.emit('connect', 'Connected to GitToken WebSocket Server')
    })

    this.socket.on('message', (msg) => {
      // Put an Emit Handler error for subscribing to main events, and specific
      // organization events
      // Handle Publish / Subscribe manager on incoming messages
      // Currently emitting everything as 'data' message
      this.emit('data', msg)
    })

    this.socket.on('close', () => {
      console.log('Connection to GitToken Socket Closed')
    })
  }

  getContract() {
    this.socket.send(JSON.stringify({ event: 'get_contract' }))
  }
}
