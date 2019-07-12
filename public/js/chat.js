const socket = io();

socket.on('message', message => {
  console.log(message);
});

socket.on('display-message', message => {
  console.log(message);
});

const form = document.getElementById('message-form');
form.onsubmit = function(e) {
  e.preventDefault();
  const message = document.getElementById('message').value;
  socket.emit('sendMessage', message);
};
