import {io} from 'socket.io-client'

let socket;
  const connectSocket = ()=>{
    if(!socket){
        socket = io.connect('http://localhost:3001',{autoConnect:true})
    }
    return socket;
}

const getSocket = ()=>socket;

export {connectSocket,getSocket}