import React, { useState } from 'react';

function JoinRoom({ setCurrentPage, setRoomId, setUsername, socket }) {
  const [name, setName] = useState('');
  const [roomCode, setRoomCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !roomCode.trim()) return;

    setUsername(name);
    setRoomId(roomCode);
    
    socket.emit('join_room', { 
      roomId: roomCode, 
      username: name 
    }, (response) => {
      if (response.error) {
        alert(response.error);
        return;
      }
      setCurrentPage('chat');
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Enter room code"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
        required
      />
      <button type="submit">Join Room</button>
    </form>
  );
}

export default JoinRoom;