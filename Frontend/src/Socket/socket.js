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

  class Socket{
    constructor(){
      this.socket = io(URL,{
        autoConnect:false
      })
    }

    async connectSocket(){
      if(!this.socket.connected){
        this.socket.connect();
        return await this.socket
      }
    }

    async  disconnectSocket(){
      if(this.socket.connected){
        this.socket.disconnect()
      }
    }

    async getSocket (){
      if(this.socket.connected){
        return await this.socket
      }
    }
  }

export default Socket;
