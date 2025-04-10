const express = require('express')
const app = express()
const PORT = 5000


const http = require("http")
const server = http.Server(app)
const cors = require("cors")
const socketIO = require("socket.io")(server, {
    cors:{
        origin: "*"
    }
})



socketIO.on("connection",(socket)=>{
    console.log(`${socket.id} user is connected`)
    socket.on("disconnect", ()=> {
        console.log(`${socket.id} user is disconnect`)
    })
} )

server.listen(PORT, ()=> {
    console.log(`Server is running on ${PORT}`);
});

//server.use(cors({origin:"*"}));

app.get('api',(req, res)=>{
    res.json({
        message: "Hello"
    })
})

