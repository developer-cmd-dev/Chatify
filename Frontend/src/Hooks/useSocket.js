import { useEffect,useState } from "react";
import { io } from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL;


export const useSocket =()=>{
const [socket,setSocket] = useState(null);
const [isConnected,setIsConnected] = useState(false);

useEffect(()=>{
const socketInstance = io(URL,{
    autoConnect:false
})
socketInstance.on('connect',()=>{
    console.log('Socket connected.')
    setIsConnected(true)
})
socketInstance.on('disconnect', () => {
    console.log('Socket disconnected');
    setIsConnected(false);
  });

  socketInstance.on('message', (message) => {
    console.log('Received message:', message);
  });

  socketInstance.on('error', (error) => {
    console.error('Socket error:', error);
  });
  setSocket(socketInstance);

  return ()=>{
    socketInstance.disconnect();
  }
},[URL])

return {socket,isConnected}

}