import http from 'http'
import express, { type Express } from 'express'
import consola from 'consola';
import cors from 'cors';
import { Server, Socket } from "socket.io";

const app: Express = express()

app.use(cors({
  origin: '*'
}))

const server = http.createServer(app);

const io: Server = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket: Socket) => {
  consola.info(`User connected, ${socket.id}`)

  socket.on('disconnect', () => {
    consola.warn(`User disconnected`)
  })

  socket.on('chat_message', (message: string) => {
    console.log('return chat message')
    socket.broadcast.emit('emit_chat_message', message)
  })
})

const port = 8000

server.listen(port, () => {
  consola.success(`Server listening on ${port}`)
})