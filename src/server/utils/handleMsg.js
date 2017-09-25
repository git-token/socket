import WebSocket from 'ws'

export default function handleMsg({ socket, message }) {
	const { event, data } = JSON.parse(message)
	switch(event) {
		case 'watch_token':
			const { organization } = data
			this.contractEventListener.write(message)
			this.contractEventListener.on('data', (_msg) => {
				const msg = JSON.parse(_msg.toString('utf8'))
				if (
					organization == msg['data']['organization'] &&
					socket.readyState === WebSocket.OPEN
				) {
					socket.send(JSON.stringify({
						event: 'watch_token',
						result: {
							type: msg['event'],
							org: msg['data']['organization'],
							id: msg['data']['transactionHash'],
							data: msg
						}
					}))
				}
			})
			break;
		case 'get_registered':
			this.proxyQuery({
				queryString: this.queryString[event],
				event,
				socket
			})
			break;
		default:
			socket.send(JSON.stringify({
				event: 'error',
				message: `${event} is an invalid event.`
			}))
			return null
	}
}
