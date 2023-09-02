const socket = io();

// Handle new user joining
const username = prompt('Enter your username:');
socket.emit('new-user', username);

// Send a chat message
document.getElementById('send-button').addEventListener('click', () => {
    const message = document.getElementById('message-input').value;
    document.getElementById('message-input').value = "";
    socket.emit('send-chat-message', message);
});

// Display chat messages
socket.on('chat-message', (data) => {
    const messageContainer = document.getElementById('message-container');
    const messageElement = document.createElement('div');
    messageElement.classList.add('message')

    // Check if the message is from the current user
    if (data.socketId === socket.id) {
        messageElement.classList.add('my-message');
    } else {
        messageElement.classList.add('other-message');
    }

    messageElement.innerHTML += `<p>${data.message}</p>`;
    messageContainer.appendChild(messageElement);
});