import React from 'react';
import './Message.css';

function Message({ name, text }) {
  return (
    <div className="message">
      <strong>{name}:</strong> {text}
    </div>
  );
}

export default Message;