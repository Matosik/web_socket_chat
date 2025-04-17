const express = require('express');
const app = express();
const PORT = 5000;

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');

// Разрешаем CORS
app.use(cors());

// Инициализируем Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // В продакшене укажите конкретный домен
    methods: ["GET", "POST"]
  }
});

// Хранилище комнат (в реальном приложении используйте БД)
const rooms = new Map();

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Создание новой комнаты
  socket.on('create_room', (username, callback) => {
    const roomId = generateRoomId();
    rooms.set(roomId, {
      users: new Map([[socket.id, username]])
    });
    
    socket.join(roomId);
    socket.emit('room_created', roomId);
    console.log(`Room created: ${roomId} by ${username}`);
    callback(roomId);
  });

  // Присоединение к существующей комнате
  socket.on('join_room', ({ roomId, username }, callback) => {
    const room = rooms.get(roomId);
    
    if (!room) {
      socket.emit('error', 'Room does not exist');
      return;
    }
    
    room.users.set(socket.id, username);
    socket.join(roomId);
    
    // Оповещаем всех в комнате о новом пользователе
    io.to(roomId).emit('user_joined', username);
    callback(roomId);
    socket.emit('room_joined', roomId);
    console.log(`${username} joined room ${roomId}`);
  });

  // Отправка сообщения в комнату
  socket.on('send_message', ({ roomId, message }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const username = room.users.get(socket.id);
    io.to(roomId).emit('receive_message', { username, message });
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
    
    // Удаляем пользователя из всех комнат
    rooms.forEach((room, roomId) => {
      if (room.users.has(socket.id)) {
        const username = room.users.get(socket.id);
        room.users.delete(socket.id);
        
        // Если комната пуста, удаляем её
        if (room.users.size === 0) {
          rooms.delete(roomId);
        } else {
          io.to(roomId).emit('user_left', username);
        }
      }
    });
  });
});

// Генерация уникального ID комнаты
function generateRoomId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});