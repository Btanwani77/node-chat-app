const path = require('path');
const publicPath = path.join(__dirname ,'/../public');
const PORT = process.env.PORT || 3000;
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')
var app = express();
var server = http.createServer(app);

var io = socketIO(server);

io.on('connection',(socket) => {
  console.log('New User Connected');


  socket.emit('newMessage', {
    from:"Admin",
    text:"Welcome To the chat app",
    createdAt:new Date().getTime()

  });
  socket.broadcast.emit('newMessage',{
    from:"Admin",
    text:"New Used Joined",
    createdAt:new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log('createMessage',message);
    socket.emit('newMessage',{
      from:message.from,
        text:message.text,
        createdAt:new Date().getTime()
    })

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
