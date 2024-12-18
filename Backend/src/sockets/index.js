import {Server} from 'socket.io';
import { chatHandler } from './handlers/chat.handler.js';

export const initializeSocket = (server)=>{
    
    const io = new Server(server,{
        cors:{
            origin:process.env.CORS_ORIGIN,
            methods:['GET','POST']
        }
    })
    

    io.on('connection',(socket)=>{
        socket.on('user-joined',userData=>{
            console.log(`${userData.username} is joined`)
        })
        chatHandler(socket)
        socket.on('disconnect',()=>{
            console.log("Socket is disconnected.");
        })
    })

return io
}

