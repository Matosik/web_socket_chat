import React, { useState, useEffect, useRef } from 'react';

function CreateChat({ onCreate }) {
  const [name, setName] = useState('');
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8080');
    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'roomCreated') {
        onCreate(data.roomCode, name);
      }
    };
    return () => ws.current.close();
  }, [name, onCreate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      ws.current.send(JSON.stringify({ type: 'createRoom', name }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Создать чат</h2>
      <input
        type="text"
        placeholder="Ваше имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Создать</button>
    </form>
  );
}

export default CreateChat;