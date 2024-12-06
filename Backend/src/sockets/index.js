import {Server} from 'socket.io';
import { chatHandler } from './handlers/chat.handler.js';

export const initializeSocket = (server)=>{
    
    const io = new Server(server,{
        cors:{
            origin:process.env.CORS,
            methods:['GET','POST']
        }
    })
    

    io.on('connection',(socket)=>{
        console.log('Socket is connected')
        chatHandler(socket)
        socket.on('disconnect',()=>{
            console.log("Socket is disconnected.");
            
        })
    })

return io
}

