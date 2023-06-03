const socket = io();
const chatbox = document.getElementById('chatbox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

let username = prompt('Please enter a username: ');
socket.emit('user-connected', username);

messageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    socket.emit('message', {username: username, message: message});
    messageInput.value = '';
});

socket.on('message', (data) => {
    const el = document.createElement('li');
    el.innerHTML = `${data.username}: ${data.message}`;
    chatbox.appendChild(el);
    // window.scrollTo(0, document.body.scrollHeight);

});

socket.on('login-failure', () => {
    alert('Login Failed!');
    alert('Your messages will not be sent')
})

socket.on('user-connected', (username) => {
    const el = document.createElement('li');
    console.log(`${username}`)
    el.innerHTML =  `${username} has been connected`;
    chatbox.appendChild(el);
    window.scrollTo(0, document.body.scrollHeight);
})