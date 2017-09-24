
export default function handleMsg({ socket, message }) {
	const { event } = JSON.parse(message)
	const queryString = this.queryString[event]

	if(!queryString) {
		socket.send(JSON.stringify({
			event: 'error',
			message: `${event} is an invalid event.`
		}))
	} else {
		this.proxyQuery({ queryString, event, socket })
	}

}
