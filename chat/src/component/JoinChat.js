import React, { useState } from 'react';

function JoinChat({ onJoin }) {
  const [roomCode, setRoomCode] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (roomCode.trim() && name.trim()) {
      onJoin(roomCode, name);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Присоединиться к чату</h2>
      <input
        type="text"
        placeholder="Код комнаты"
        value={roomCode}
        onChange={(e) => setRoomCode(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Присоединиться</button>
    </form>
  );
}

export default JoinChat;