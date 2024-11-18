const express = require('express');
const http = require('http');
const app = express();
const {Server}= require('socket.io')
const cors = require("cors");
app.use(cors())
const server = http.createServer(app);

const io = new Server(server,{
    cors:{
        origin:'http://localhost:5173',
        methods:['GET','POST'],
    }
})



io.on("connection",(socket)=>{
    try {
        socket.on('new-user-joined',email=>{
            console.log(`New User Joined - ${email} and id - ${socket.id}`)
            socket.broadcast.emit('user-joined',email);
        })

        socket.on('new-message',message=>{
           socket.emit('user-message',message);
        })
    } catch (error) {
        return error
    }

    
})

server.listen(3001,()=>{
    console.log("Server is running at 3001");
})