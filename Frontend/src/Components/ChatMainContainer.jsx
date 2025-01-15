import React, { useCallback, useEffect, useState } from 'react'
import { Badge, Avatar, useSelect } from "@nextui-org/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import { Separator } from "@/components/ui/separator";
import { connectSocket,getSocket } from "../Socket/socket";
import { useSelector } from 'react-redux';
import Message from '../models/Message'

function ChatMainContainer() {
const userData = useSelector((state)=>state.UserData);
const [message,setMessage]=useState('')

useEffect(()=>{
  ;(async()=>{
    connectSocket();
    const socket = await getSocket();
    socket.on('connect',()=>{
      console.log('socket is connceted');
      socket.emit('user-joined',userData);
    })
  })()
},[])


const handleSubmit = useCallback((e)=>{
    e.preventDefault()
    console.log(message)
    const msgObj = new Message(userData.username,message);
    console.log(msgObj)
},[message])

  return (
    <div className="ChatContainer bg-[#110D24] rounded-[30px] h-full w-[750px] flex flex-col items-center justify-center p-4">
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

    <div className="chat h-[75%] w-full ">
      <div className=" w-fit h-fit p-3 bg-[#211845] rounded-xl">
        <img
          className="rounded-xl w-[10vw]"
          src="https://images.unsplash.com/photo-1721332155637-8b339526cf4c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
      </div>

      <div className=" min-w-[40%] rounded-bl-none text-white my-2 max-w-[40%] h-fit p-3 bg-[#211845] rounded-xl">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
          ipsa deserunt aliquid debitis omnis atque rem quis mollitia,
          tempora voluptate?
        </p>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="messageInput w-full h-[8%]  bg-[#171031] rounded-2xl flex items-center justify-around ">
      <div className="w-[6%] bg-[#251B4C] h-[70%] rounded-xl flex items-center justify-center">
        <IoAdd className="text-white text-xl" />
      </div>
      <div className=" w-[75%] h-full">
        <input
        onChange={(e)=>setMessage(e.target.value)}
          value={message}
          type="text"
          className="w-full bg-transparent h-full outline-none text-white"
          placeholder="Type a message ..."
        />
      </div>
      <div className="w-[10%] h-full  flex items-center justify-center">
        <button className="w-[90%] h-[60%]  rounded-xl bg-[#DBFB7F] flex items-center justify-around">
          <BiSolidSend className="text-xl" />
        </button>
      </div>
    </form>
  </div>  )
}

export default ChatMainContainer