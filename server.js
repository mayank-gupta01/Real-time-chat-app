const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname + '/public'));

// Store connected users
const users = {};

io.on('connection', (socket) => {
    // Handle new user connections
    socket.on('new-user', (username) => {
        users[socket.id] = username;
        socket.broadcast.emit('user-connected', username);
    });

    // Handle messages
    socket.on('send-chat-message', (message) => {
        if (message !== '') {
            io.emit('chat-message', {
                message: message,
                username: users[socket.id],
                socketId: socket.id
            });
        }
    });

    // Handle user disconnects
    socket.on('disconnect', () => {
        socket.broadcast.emit('user-disconnected', users[socket.id]);
        delete users[socket.id];
    });
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
