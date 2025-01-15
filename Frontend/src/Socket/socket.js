import { Socket ,io} from "socket.io-client";
const URL = import.meta.env.VITE_SOCKET_URL
export const  getSocket =async ()=>{
    try {
        const socket  = await io(URL,{
            autoConnect:false
        })
        return socket
    } catch (error) {
        console.log(error.message)
    }
}

