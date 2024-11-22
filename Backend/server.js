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


let usersArr=[]
let yourData = {
    id:null,
    username:null,
}
let errorMsg = {
    error:false,
    message:''
}
io.on("connection",(socket)=>{
    console.log("Socket is connected.")
    try {
        socket.on('new-user-joined',email=>{
            console.log(`New User Joined - ${email} and id - ${socket.id}`)
            usersArr.push({id:socket.id,username:email})
            yourData={
                id:socket.id,
                username:email
            }
            socket.emit('your-data',yourData)
            socket.broadcast.emit('new-user-joined',{type:'new-user-joined',id:socket.id,username:email})
        })

        socket.on('new-message',message=>{
           socket.broadcast.emit('user-message',message);
        })

        socket.on('send-message',msgObj=>{
            msgObj = {
                ...msgObj,
                type:'user-message',
            }
            console.log(msgObj)
            socket.broadcast.emit('user-message',msgObj)
        })

        socket.on('disconnect',offServer=>{
            if(offServer){
                socket.disconnect()
                console.log('Socket is disconnected.');
                
            }
        })

        
    } catch (error) {
        return error
    }

    
})

server.listen(5000,()=>{
    console.log("Server is running at 5000");
})