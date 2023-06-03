const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Add this line to serve your static files
app.use(express.static(path.join(__dirname, '.')));

io.on('connection', (socket) => {

    const usernameWhitelist = ['Tushin', 'Garvit', 'Dev', 'Ishwinder'];

    const userIpAddress = socket.request.connection.remoteAddress;
    console.log(`New user connected from IP: ${userIpAddress}`);

    socket.on('user-connected', (username) => {
        if(usernameWhitelist.includes(username)){
            console.log(`User '${username}' connected from IP: ${userIpAddress}`);
            // socket.emit('login-success');
            socket.broadcast.emit('user-connected', username);
        } else{
            socket.emit('login-failure');
            socket.disconnect();
        }
    });

    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
