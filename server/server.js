const path = require('path');
const publicPath = path.join(__dirname ,'/../public');
const PORT = process.env.PORT || 3000;
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')
const {generateMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket) => {
  console.log('New User Connected');


  socket.emit('newMessage', generateMessage('Admin','Welcome To The Chat App'));
  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage',message);
    socket.emit('newMessage',generateMessage(message.from,message.text));

    // io.emit('newMessage',{
    //   from:message.from,
    //   text:message.text,
    //   createdAt:new Date().getTime()
    // });
// #########################################################
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //     text:message.text,
    //     createdAt:new Date().getTime()
    // })
  });

  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});



app.use(express.static(publicPath));


server.listen(PORT,() => {
  console.log(`Server is up on port ${PORT}`);
})
