import { io } from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL
const socket = io(URL, {
    autoConnect: false, // Avoid connecting automaticall
  });
export const connectSocket = async () => {
    if (!socket.connected) {
        socket.connect();
      }
      return socket;
}

export const disconnectSocket = () => {
    if (socket.connected) {
      socket.disconnect();
    }
  };

  export const getSocket = () => socket;


