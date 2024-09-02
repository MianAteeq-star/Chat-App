import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Frontend URL
    methods: ["GET", "POST"]
  }
});

// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });
export const getRecieverSocket = (recieverId) => {
  return userSocketMap[recieverId]
}
const userSocketMap = {}  // {userId --> socketId}
io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);
  const userId = socket.handshake.query.userId;
  if(userId){
    userSocketMap[userId] = socket.id // store id in usermap
  }

 io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('onlineUsers', (user) => {
    console.log('User logged in:', user);
    // Handle the event here, e.g., broadcast the online users
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    delete userSocketMap[userId]
 io.emit('getOnlineUsers', Object.keys(userSocketMap));

  });
});

server.listen(5000, () => {
  console.log('server running at http://localhost:4000');
});


export {io,server,app}