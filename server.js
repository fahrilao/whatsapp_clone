const express = require('express')
const app = express()

const createServer = require('http').createServer
const Server = require('socket.io').Server
const cors = require('cors')

app.use(cors)
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  const id = socket.handshake.query.id
  
  socket.join(id)
  socket.on('send_message', payload => {
    socket.broadcast.to([payload.id]).emit('receiving_message', payload)
  })
});

httpServer.listen(4000, () => {
  console.log('Running on port 4000')
});