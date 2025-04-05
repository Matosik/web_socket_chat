import React, { useState } from 'react';
import './InputMessage.css';

function InputMessage({ onSendMessage }) {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue); // Отправляем сообщение через функцию, переданную из ChatPlace
      setInputValue(''); // Очищаем поле ввода
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend(); // Отправка по нажатию Enter
    }
  };

  return (
    <div className="input-message-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Напишите сообщение..."
        className="message-input"
      />
      <button onClick={handleSend} className="send-button">
        Отправить
      </button>
    </div>
  );
}

export default InputMessage;