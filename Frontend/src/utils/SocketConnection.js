import { io, Socket } from 'socket.io-client'
import { apiRequest } from './axiosHandler';

let socket=null
const connectSocket = async () => {
  try {
    if (!socket) {
      socket = io.connect('http://localhost:3002', { autoConnect: true });
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject( new Error('Connection timeout: Backend is not reachable.'));
        }, 1000); 

        socket.on('connect', () => {
          clearTimeout(timeout);
          resolve();
        });

        socket.on('connect_error', (err) => {
          clearTimeout(timeout);
          reject(new Error(`Connection error: ${err.message}`));
        });
      });
    } 
    return socket;
  } catch (error) {
    console.error('Socket connection failed:', error.message);
    return null
  }
};

const getSocket = async () => {
  if (!socket) {
    throw new Error('Socket is not initialized. Call connectSocket first.');
  }
  return socket;
};

const disconnectSocket = async(_id,path,method)=>{
 
  try {
    if(!socket){
      return 
    }else{
      socket.on('disconnect',()=>console.log('Socket disconnected.'));
      socket.disconnect()
      const res = await apiRequest(`/api/v1${path}`,method,{_id});
      socket = null;
      return res
    }
  } catch (error) {
    console.log(error);
  }
  
  
} 

const useDisconnectSocket = (id,path)=>{
  console.log(id,path)
}





export { connectSocket, getSocket,disconnectSocket,useDisconnectSocket }