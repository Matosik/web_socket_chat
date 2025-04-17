import React, { useState } from 'react';
import CreateRoom from './create';
import JoinRoom from './join';

function HomePage({ setCurrentPage, setRoomId, setUsername, socket }) {
  const [activeTab, setActiveTab] = useState('create');

  return (
    <div className="home-page">
      <div className="tabs">
        
        <button 
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}>
          Создавть комнату
        </button>

        <button 
          className={activeTab === 'join' ? 'active' : ''}
          onClick={() => setActiveTab('join')}>
          Войти в комнату
        </button>

      </div>

      {activeTab === 'create' ? (
        <CreateRoom 
          setCurrentPage={setCurrentPage}
          setRoomId={setRoomId}
          setUsername={setUsername}
          socket={socket}/>
      ) : (
        <JoinRoom 
          setCurrentPage={setCurrentPage}
          setRoomId={setRoomId}
          setUsername={setUsername}
          socket={socket}/>
      )}
    </div>
  );
}

export default HomePage;