import React, { useState } from 'react';
import JoinChat from './component/JoinChat';
import CreateChat from './component/CreateChat';
import ChatPlace from './component/Chat/ChatPlace';
import './App.css';

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [userName, setUserName] = useState('');

  const handleJoin = (code, name) => {
    setRoomCode(code);
    setUserName(name);
  };

  const handleCreate = (code, name) => {
    setRoomCode(code);
    setUserName(name);
  };

  if (roomCode) {
    return <ChatPlace roomCode={roomCode} userName={userName} />;
  }

  return (
    <div className="App">
      <h1>Чат</h1>
      <JoinChat onJoin={handleJoin} />
      <CreateChat onCreate={handleCreate} />
    </div>
  );
}

export default App;