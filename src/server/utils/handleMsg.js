import WebSocket from 'ws'

export default function handleMsg({ socket, message }) {
	const { type, data } = JSON.parse(message)
	switch(type.toUpperCase()) {
		case 'WATCH_TOKEN':
			const { organization } = data
			this.contractEventListener.write(message)
			this.contractEventListener.on('data', (_msg) => {
				let msg
				try {
					msg = JSON.parse(_msg.toString('utf8'))
					if (
						organization == msg['data']['organization'] &&
						socket.readyState === WebSocket.OPEN
					) {
						socket.send(JSON.stringify({
							type: 'WATCH_TOKEN',
							event: msg['event'],
							org: msg['data']['organization'],
							id: msg['data']['transactionHash'],
							data: msg
						}))
					}
				} catch(error) {
					console.error(error)
					console.log('msg', msg)
				}

			})
			break;
		case 'GET_REGISTERED':
			this.proxyQuery({
				queryString: this.queryString[type],
				type,
				socket
			})
			break;
		default:
			socket.send(JSON.stringify({
				type: 'error',
				result: `${event} is an invalid event.`
			}))
			return null
	}
}
