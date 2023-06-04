const socket = io();
const chatbox = document.getElementById('chatbox');
const messageForm = document.getElementById('messageForm');
const messageInput = document.getElementById('messageInput');

// This is for the anonymous board

const boardInput = document.getElementById('boardInput');
const boardForm = document.getElementById('boardForm');
const messageBoard = document.getElementById('messageBoard');

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
    alert('Redirecting To Anonymous Board')
    window.location.assign('anym.html');
    username = "Anym";
})

socket.on('user-connected', (username) => {
    const el = document.createElement('li');
    console.log(`${username}`)
    el.innerHTML =  `${username} has been connected`;
    chatbox.appendChild(el);
    window.scrollTo(0, document.body.scrollHeight);
})

