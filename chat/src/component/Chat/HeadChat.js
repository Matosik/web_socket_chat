import React from 'react';
import './HeadChat.css';

function HeadChat({ roomCode, participants }) {
  return (
    <div className="head-chat">
      <h2>Комната: {roomCode}</h2>
      <p>Участников: {participants}</p>
    </div>
  );
}

export default HeadChat;