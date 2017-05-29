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
  var li = jQuery('<li></li>');
  li.text(`${message.from}:${message.text}`);
  jQuery('#messages').append(li);
});


// socket.emit('createMessage', {
//   from:"frank",
//   text:"Hello"
// }, function (data)  {
//   console.log('Got it',data);
// });


jQuery('#message-form').on('submit',function(e) {
  e.preventDefault();
  socket.emit('createMessage',{
    from:'USER',
    text:jQuery('[name=message]').val()
  },function () {

  });
});
