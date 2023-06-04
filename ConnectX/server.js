const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const fs = require('fs');

const MESSAGE_FILE = 'messages.txt';

const messages = loadMessages();

// Add this line to serve your static files
app.use(express.static(path.join(__dirname, '.')));

io.on('connection', (socket) => {

    const usernameWhitelist = ['Tushin', 'Garvit', 'Dev', 'Ishwinder', 'Anym', 'Dhruvit'];

    const userIpAddress = socket.request.connection.remoteAddress;
    console.log(`New user connected from IP: ${userIpAddress}`);

    socket.on('user-connected', (username) => {
        if (usernameWhitelist.includes(username)) {
            console.log(`User '${username}' connected from IP: ${userIpAddress}`);
            // socket.emit('login-success');
            socket.broadcast.emit('user-connected', username);
        } else {
            socket.emit('login-failure');
            socket.disconnect();
        }
    });

    socket.emit('messages', messages);

    socket.on('message', (msg) => {
        messages.push(msg);
        saveMessages(messages);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

function loadMessages() {
    try {
        if (fs.existsSync(MESSAGE_FILE)) {
            const data = fs.readFileSync(MESSAGE_FILE, 'utf8');
            if (data) {
                return JSON.parse(data);
            }
        }
    } catch (err) {
        console.error('Error loading messages:', err);
    }
    return [];
}

function saveMessages(messages) {
    try {
        fs.writeFileSync(MESSAGE_FILE, JSON.stringify(messages));
    } catch (err) {
        console.error('Error saving messages:', err);
    }
}

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
