export default function proxyQuery({ type, socket, queryString }) {
  this.query({ queryString }).then((result) => {
    socket.send(JSON.stringify({ type,  result }))
  }).catch((error) => {
    socket.send(JSON.stringify({ type: 'error', result: error.message }))
  })
}
