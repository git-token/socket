import Websocket from 'ws'
import EventEmitter from 'events'

export default class GitTokenSocketClient extends EventEmitter {
  constructor({ socketUri }) {
    super()
    this.socket = new Websocket(socketUri)
    this.socket.on('open', () => {
      console.log('Connected to GitToken Socket Server')
      this.emit('connect')
    })

    this.socket.on('message', (msg) => {
      // Handle Publish / Subscribe manager on incoming messages
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
