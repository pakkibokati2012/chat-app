const socket = io();

const $messageForm = document.querySelector('#message-form');
const $messageFormInput = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $sendLocationButton = document.querySelector('#send-location');
const $messages = document.querySelector('#messages');

// Templates

const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;

socket.on('message', message => {
  console.log(message);
  const html = Mustache.render(messageTemplate, {
    message
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('locationMessage', location => {
  console.log(location);
  const html = Mustache.render(locationTemplate, {
    location
  });
  $messages.insertAdjacentHTML('beforeend', html);
});

$messageForm.addEventListener('submit', e => {
  e.preventDefault();
  $messageFormButton.setAttribute('disabled', 'disabled');
  const message = e.target.elements.message.value;
  socket.emit('sendMessage', message, error => {
    $messageFormButton.removeAttribute('disabled');
    $messageFormInput.value = '';
    $messageFormInput.focus();
    if (error) {
      return console.log(error);
    }
    console.log('Message delivered!');
  });
});

$sendLocationButton.addEventListener('click', () => {
  if (!('geolocation' in navigator)) {
    return alert('Geolocation not supported in your browser!');
  }
  $sendLocationButton.setAttribute('disabled', 'disabled');
  navigator.geolocation.getCurrentPosition(location => {
    socket.emit(
      'sendLocation',
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      },
      error => {
        $sendLocationButton.removeAttribute('disabled');
        if (error) {
          return console.log(error);
        }
        console.log('Location shared successfully!');
      }
    );
  });
});
