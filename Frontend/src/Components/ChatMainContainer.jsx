import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Avatar, useSelect } from "@nextui-org/react";
import { BsJustify, BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { connectSocket,getSocket } from "../Socket/socket";
import { useSelector } from 'react-redux';
import Message from '../models/Message'
import MessageInput from './MessageInput';
import ChatArea from './ChatArea';

function ChatMainContainer() {
const userData = useSelector((state)=>state.UserData);
const [message,setMessage]=useState('');
const [messageData,setMessageData] = useState([]);
const [socket,setSocket] = useState(null)

useEffect(()=>{
  ;(async()=>{
    connectSocket();
    const socketData = await getSocket();
    socketData.on('connect',()=>{
      console.log('Socket is connected');
      
    });
    socketData.emit('userData',userData);
    socketData.on('users-message',data=>{
      setMessageData((prev)=>[...prev,data])
    })
  })()
},[])


useEffect(() => {

}, [socket])


const getMessage = (data)=>{
    const msgObj = new Message(userData.username,data,'your-message');
    console.log(msgObj)
    const socket = getSocket();
    socket.emit('chat:message',msgObj);
    setMessageData((prev)=>[...prev,msgObj]);
}

useEffect(()=>{
  console.log(messageData)
},[messageData])

  return (
    <div className="ChatContainer bg-[#110D24] rounded-[30px] h-full w-[750px] flex flex-col items-center justify-center p-4 ">
    <div className="user rounded-2xl flex items-center justify-between w-full h-20 bg-[#1B1338] ">
      <div className="h-full w-[70%]  flex items-center text-white ">
        <div className=" w-[17%] flex items-center justify-center h-full">
          <Badge
            color="success"
            content=""
            placement="bottom-right"
            shape="circle"
            size="sm"
          >
            <Avatar
              size="lg"
              radius="full"
              src={userData.avatar}
              isBordered={false}
            />
          </Badge>
        </div>

        <div className=" text-lg">
          <h1>{userData.email}</h1>
          <p className="opacity-20 text-sm">online</p>
        </div>
      </div>

      <div className="w-[13%] h-full  flex items-center justify-center">
        <div className="bg-[#241A4B] w-[50%] h-[50%] rounded-xl text-white flex items-center justify-center">
          <BsThreeDotsVertical />
        </div>
      </div>
    </div>

    <Separator className="my-4 bg-slate-800 w-[80%]" />
    <div className=' h-[75%] relative border w-full   '>
    <ChatArea/>
    </div>
    <MessageInput getMessage={getMessage}/>
   
  </div>  )
}

export default ChatMainContainer