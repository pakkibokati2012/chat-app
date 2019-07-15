const socket = io();

socket.on('message', message => {
  console.log(message);
});

document.querySelector('#message-form').addEventListener('submit', e => {
  e.preventDefault();
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, error => {
    if (error) {
      return console.log(error);
    }
    console.log('Message delivered!');
  });
});

document.querySelector('#send-location').addEventListener('click', () => {
  if (!('geolocation' in navigator)) {
    return alert('Geolocation not supported in your browser!');
  }
  navigator.geolocation.getCurrentPosition(location => {
    socket.emit('sendLocation', {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    });
  });
});
