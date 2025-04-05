import React, { useEffect, useRef, useState } from 'react';
import './ChatPlace.css';
import HeadChat from './HeadChat';
import MessagePlace from './MessagePlace';
import InputMessage from './InputMessage';

function ChatPlace({ roomCode, userName }) {
  const [messages, setMessages] = useState([]); // Список сообщений
  const [participants, setParticipants] = useState(1); // Количество участников (начинаем с 1 — текущий пользователь)
  const ws = useRef(null); // Ссылка на WebSocket

  useEffect(() => {
    // Устанавливаем соединение с WebSocket
    ws.current = new WebSocket('ws://localhost:8080');

    ws.current.onopen = () => {
      // При подключении отправляем сообщение о присоединении к комнате
      ws.current.send(JSON.stringify({ type: 'joinRoom', roomCode, name: userName }));
    };

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        // Добавляем новое сообщение в список
        setMessages((prev) => [...prev, { name: data.name, text: data.text }]);
      } else if (data.type === 'userJoined') {
        // Увеличиваем количество участников
        setParticipants((prev) => prev + 1);
      } else if (data.type === 'userLeft') {
        // Уменьшаем количество участников
        setParticipants((prev) => prev - 1);
      } else if (data.type === 'error') {
        alert(data.message);
      }
    };

    // Закрываем соединение при размонтировании компонента
    return () => ws.current.close();
  }, [roomCode, userName]);

  const sendMessage = (text) => {
    if (ws.current && text.trim()) {
      // Отправляем сообщение на сервер
      ws.current.send(JSON.stringify({ type: 'sendMessage', roomCode, name: userName, text }));
    }
  };

  return (
    <div className="chat-place-container">
      <HeadChat roomCode={roomCode} participants={participants} />
      <MessagePlace messages={messages} />
      <InputMessage onSendMessage={sendMessage} />
    </div>
  );
}

export default ChatPlace;