import dotevn from 'dotenv';
import connectDB from './db/index.js';
import {app} from './app.js'
import http from 'http'
import { initializeSocket } from './sockets/index.js';
import { error } from 'console';
const PORT = process.env.PORT
const HOST =  '192.168.174.158'|| '0.0.0.0';
const server = http.createServer(app)


dotevn.config({path:'./env'});
connectDB()
.then(()=>{

   
        server.listen( PORT || 8000,()=>{
            console.log(`Server is running on Port || ${PORT}`)
            initializeSocket(server)
        })
        server.on('error',(error)=>console.log(error));
        server.on('clientError', (err, socket) => {
            console.error('Client Error:', err.message);
            socket.destroy();
          })
    
    
  

}).catch((error)=>console.log('MongoDb Connection Failed.',error))











