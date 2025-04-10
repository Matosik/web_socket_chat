import {Route, Routes} from "react-router-dom"
import socketIO from 'socket.io-client'
import Home from './componets/home/home.jsx'
import ChatPage from './componets/chat/index.jsx'
const socket = socketIO.connect("http://localhost:5000")

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/chat" element={<ChatPage/>}></Route>
    </Routes>
  )
}

export default App
