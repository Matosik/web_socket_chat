import {Route, Routes} from "react-router-dom"
import React, { useState } from 'react';
import socketIO from 'socket.io-client'
import HomePage from './componets/home/home.jsx'
import ChatPage from './componets/chat/chat.jsx'
const socket = socketIO.connect("http://192.168.0.188:5000")

function App() {

  const [currentPage, setCurrentPage] = useState('home');
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');

  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomePage
          setCurrentPage={setCurrentPage}
          setRoomId={setRoomId}
          setUsername={setUsername}
          socket={socket}
        />
      )}
      {currentPage === 'chat' && (
        <ChatPage
          roomId={roomId}
          username={username}
          socket={socket}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

export default App
