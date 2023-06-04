const socket = io();
const boardInput = document.getElementById('boardInput');
const boardForm = document.getElementById('boardForm');
const messageBoard = document.getElementById('messageBoard');
const messageList = document.getElementById('messageList');

let messages = [];


boardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = boardInput.value;
    socket.emit('message', message);
    boardInput.value = '';
});


socket.on('message', (msg) => {
    const listItem = document.createElement('li');
    listItem.textContent = msg;
    messageList.appendChild(listItem);
    window.scrollTo(0, document.body.scrollHeight);
});


// x4Q3Xeaj9RDTJmk6