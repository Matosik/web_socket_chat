import React, { useState } from 'react';

function CreateRoom({ setCurrentPage, setRoomId, setUsername, socket }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setUsername(name);
    
    socket.emit('create_room', name, (roomId) => {
      setRoomId(roomId);
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
      <button type="submit">Create Room</button>
    </form>
  );
}

export default CreateRoom;