import Promise from 'bluebird'
import WebSocket from 'ws'
import mysql from 'mysql'

import GitTokenEventWatcherClient  from 'gittoken-event-listener/dist/client/index'

import {
  handleMsg
} from './utils/index'

import {
  proxyQuery,
  queryString,
  query
} from './sql/index'

import {
  store
} from './redux/index'

export default class GitTokenSocketServer extends GitTokenEventWatcherClient {
  constructor({
    socketPort,
    mysqlHost,
    mysqlUser,
    mysqlRootPassword,
    mysqlDatabase,
    watcherIpcPath
  }) {
    super({ watcherIpcPath })
    this.query       = query.bind(this)
		this.handleMsg   = handleMsg.bind(this)
    this.proxyQuery  = proxyQuery.bind(this)

    this.queryString = queryString
    this.store = store

    // this.unsubscribe = this.store.subscribe(() => {
    //   console.log('store', JSON.stringify(this.store.getState(), null, 2))
    // })

    // Instantiate MySql Connection
    this.mysql = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase,
    })

		this.server = new WebSocket.Server({ port: socketPort }, () => {
			console.log('GitToken Socket Server Started on Port: ', socketPort)

      // Listen for contract event listener messages
      this.socket.on('data', (_msg) => {
        const msg = JSON.parse(_msg.toString('utf8'))
        this.store.dispatch({
          type: msg['event'],
          org: msg['data']['organization'],
          id: msg['data']['transactionHash'],
          data: msg
        })
      })

		})

		this.server.on('connection', (socket, req) => {
			socket.on('message', (message) => {
        console.log('message', message)
        this.handleMsg({ socket, message })
      })
		})

  }



}
