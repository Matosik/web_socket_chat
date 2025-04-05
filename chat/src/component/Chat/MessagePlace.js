import React from 'react';
import './MessagePlace.css';
import Message from './Message';

function MessagePlace({ messages }) {
  return (
    <div className="message-place">
      {messages.map((msg, index) => (
        <Message key={index} name={msg.name} text={msg.text} />
      ))}
    </div>
  );
}

export default MessagePlace;