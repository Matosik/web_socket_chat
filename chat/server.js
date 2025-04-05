const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const port = 8080;
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const rooms = {}; // Хранит комнаты и пользователей в памяти

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        const data = JSON.parse(message);
        switch (data.type) {
            case 'createRoom':
                const roomCode = generateRoomCode();
                rooms[roomCode] = { users: [{ name: data.name, ws }] };
                ws.send(JSON.stringify({ type: 'roomCreated', roomCode }));
                console.log(`✅ Создана команата с ключем ${roomCode}. Создатель комнаты - ${data.name}`)
                break;
            case 'joinRoom':
                const room = rooms[data.roomCode];
                if (room) {
                    room.users.push({ name: data.name, ws });
                    ws.send(JSON.stringify({ type: 'joinedRoom', roomCode: data.roomCode }));
                    // Оповестить всех в комнате о новом пользователе
                    room.users.forEach(user => {
                        user.ws.send(JSON.stringify({ type: 'userJoined', name: data.name }));
                    });
                } else {
                    ws.send(JSON.stringify({ type: 'error', message: 'Room not found' }));
                }
                break;
            case 'sendMessage':
                const roomToSend = rooms[data.roomCode];
                if (roomToSend) {
                    roomToSend.users.forEach(user => {
                        user.ws.send(JSON.stringify({ 
                            type: 'message', 
                            name: data.name, 
                            text: data.text, 
                            roomCode: data.roomCode 
                        }));
                    });
                }
                else{
                    ws.send(JSON.stringify({ type: 'error', message: 'Room was deleted' }));
                }
                break;
        }
    });

    ws.on('close', () => {
        // Удаление пользователя при отключении
        for (const roomCode in rooms) {
            const room = rooms[roomCode];
            const userIndex = room.users.findIndex(user => user.ws === ws);
            if (userIndex !== -1) {
                const user = room.users.splice(userIndex, 1)[0];
                room.users.forEach(user => {
                    user.ws.send(JSON.stringify({ type: 'userLeft', name: user.name }));
                });
                if (room.users.length === 0){
                    delete rooms[roomCode];
                    console.log(`❌ Комната ${room.roomCode} была удалена`);
                }
            }
        }
    });
});

function generateRoomCode() {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
}

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});