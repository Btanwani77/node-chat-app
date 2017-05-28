var socket = io();

socket.on('connect',function () {
  console.log('Connected to server');
  // socket.emit('createMessage',{
  //   from:"jayant@gmail.com",
  //   text:'hey this is tanwani'
  // })
});

socket.on('disconnect',function () {
  console.log('Disconnected from server');
});


socket.on('newMessage',function (message) {

  console.log('New Message',message);
});
