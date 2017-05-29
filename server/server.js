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

  socket.on('createMessage', (message,callback) => {
    console.log('createMessage',message);
    // socket.emit('newMessage',generateMessage(message.from,message.text));

    io.emit('newMessage',generateMessage(message.from,message.text));
    callback('This is from the server');
    });
// #########################################################
    // socket.broadcast.emit('newMessage',{
    //     from:message.from,
    //     text:message.text,
    //     createdAt:new Date().getTime()
    // })


  socket.on('disconnect',() => {
    console.log('User was disconnected');
  });
});




app.use(express.static(publicPath));


server.listen(PORT,() => {
  console.log(`Server is up on port ${PORT}`);
})

// note:
// The io variable represents the group of sockets. The code you have starts on line one with providing a function in the second parameter that gives you a socket variable every time a new connection is made. The socket variable is only for communicating with each individual connection. You may not see it in the code but there will be one socket variable for each connection established
// socket.emit('message', "this is a test"); //sending to sender-client only
// socket.broadcast.emit('message', "this is a test"); //sending to all clients except sender
// socket.broadcast.to('game').emit('message', 'nice game'); //sending to all clients in 'game' room(channel) except sender
// socket.to('game').emit('message', 'enjoy the game'); //sending to sender client, only if they are in 'game' room(channel)
// socket.broadcast.to(socketid).emit('message', 'for your eyes only'); //sending to individual socketid
// io.emit('message', "this is a test"); //sending to all clients, include sender
// io.in('game').emit('message', 'cool game'); //sending to all clients in 'game' room(channel), include sender
// io.of('myNamespace').emit('message', 'gg'); //sending to all clients in namespace 'myNamespace', include sender
// socket.emit(); //send to all connected clients
// socket.broadcast.emit(); //send to all connected clients except the one that sent the message
// socket.on(); //event listener, can be called on client to execute on server
// io.sockets.socket(); //for emiting to specific clients
// io.sockets.emit(); //send to all connected clients (same as socket.emit)
// io.sockets.on() ; //initial connection from a client.
