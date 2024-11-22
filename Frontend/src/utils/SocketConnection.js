import { io, Socket } from 'socket.io-client'

let socket;
const connectSocket = async () => {
  try {
    if (!socket) {
      socket = io.connect('http://localhost:5000', { autoConnect: true });
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('Connection timeout: Backend is not reachable.'));
        }, 2000); 

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

const getSocket = () => {
  if (!socket) {
    throw new Error('Socket is not initialized. Call connectSocket first.');
  }
  return socket;
};

const disConnectSocket = async ()=>{
 socket.disconnect(true)
}

export { connectSocket, getSocket,disConnectSocket }