import Websocket from 'ws'
import EventEmitter from 'events'

export default class GitTokenSocketClient extends EventEmitter {
  constructor({ socketUri }) {
    super()
    this.socket = new Websocket(socketUri)
    this.socket.on('open', () => {
      console.log('Connected to GitToken Socket Server')
      this.getContract()
    })

    this.socket.on('message', (msg) => {
      const { event, result } = JSON.parse(msg)
      if (result) { this.emit(event, result) }
    })

    this.socket.on('close', () => {
      console.log('Connection to GitToken Socket Closed')
    })
  }

  getContract() {
    this.socket.send(JSON.stringify({ event: 'get_contract' }))
  }
}
