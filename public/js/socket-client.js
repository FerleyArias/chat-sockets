const socket = io();

const online = document.querySelector('#online');
const offline = document.querySelector('#offline');
const my_user = document.querySelector('#user');
const message = document.querySelector('#message');
const send = document.querySelector('#send');

socket.on('connect', () => {
  online.style.display = '';
  offline.style.display = 'none';
});

socket.on('disconnect', () => {
  console.log(`Desconectado del servidor`);
  online.style.display = 'none';
  offline.style.display = '';
});

//Añadir items
const add = (payload) => {
  const form = document.querySelector('.messages');
  const {user, send_message} = payload
  const div = document.createElement("div")
  div.setAttribute("class", "mes")
  div.textContent = `${user}: ${send_message}`
  form.appendChild(div)
}

socket.on('server-response', (payload) => {
  add(payload)
});

send.addEventListener('click', () => {
  const user = my_user.value;
  const send_message = message.value;
  const today = new Date();
  let current_hour = `${today.getHours()}:${today.getMinutes()} `;

  const payload = {
    user,
    send_message,
    current_hour,
  };
  add(payload)
  socket.emit('send-message', payload);
});
