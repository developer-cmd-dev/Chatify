import io from 'socket.io-client'
let socket; 
 const connectSocket=(url)=>{
    if(!socket){
       socket = io.connect(url)
    }
    return socket
}

 const getSocket = ()=>socket;
 const disconnectSocket = ()=>{
    if(socket){
        socket.disconnect();
        socket=null
    }
}

export {connectSocket,getSocket,disconnectSocket}