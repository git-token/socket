export default function proxyQuery({ event, socket, queryString }) {
  this.query({ queryString }).then((result) => {
    socket.send(JSON.stringify({ event,  result }))
  }).catch((error) => {
    socket.send(JSON.stringify({ event: 'error', result: error.message }))
  })
}
