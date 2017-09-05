import Promise from 'bluebird'
import WebSocket from 'ws'
import mysql from 'mysql'

import handleMsg from './handleMsg'
import proxyQuery from './proxyQuery'
import queryString from './queryString'
import query from './query'


export default class GitTokenSocketServer {
  constructor({
    socketPort,
    mysqlHost,
    mysqlUser,
    mysqlRootPassword,
    mysqlDatabase
  }) {

    this.query       = query.bind(this)
		this.handleMsg   = handleMsg.bind(this)
    this.proxyQuery  = proxyQuery.bind(this)

    this.queryString = queryString

    // Instantiate MySql Connection
    this.mysql = mysql.createConnection({
      host: mysqlHost,
      user: mysqlUser,
      password: mysqlRootPassword,
      database: mysqlDatabase,
    })

		this.server = new WebSocket.Server({ port: socketPort }, () => {
			console.log('GitToken Socket Server Started on Port: ', socketPort)
		})

		this.server.on('connection', (socket, req) => {
			socket.on('message', (message) => { this.handleMsg({ socket, message }) })
		})

  }



}
