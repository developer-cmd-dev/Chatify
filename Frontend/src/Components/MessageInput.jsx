import React, { useEffect, useState } from "react";
import { Input } from "./index";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

function MessageInput({ classname, colorThemeCode,messageData }) {
  const [message , setMessage]=useState('')

  const handleSumbit =()=>{
    messageData(message)
    setMessage('')
  }
  return (
    <form onSubmit={(e)=>{
      e.preventDefault()
      message.length > 0 && handleSumbit()
      }} className="h-full w-full flex items-center justify-around ">
      <button
        className={` w-10 h-10 rounded-full  bg-slate-800 flex items-center justify-center`}
       
      >
        <FaPlus className="text-xl" />
      </button>
      <div className="w-[65%] lg:w-[90%] ">

        <input
         type="text"
         className="w-full border-none h-10 rounded-xl pl-4 bg-slate-800 text-white placeholder-white"
         name='message' 
         value={message}
         onChange={(e)=>setMessage(e.target.value)}/>

      </div>
      <button
        disabled={message===''}
        className=" w-10 h-10 rounded-full flex items-center  bg-slate-800 justify-center "
        type="submit"
      >
        <IoIosSend className="text-xl" />
      </button>
    </form>
  );
}

export default MessageInput;
