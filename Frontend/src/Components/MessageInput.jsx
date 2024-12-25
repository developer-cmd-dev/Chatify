import React, { useEffect, useState } from "react";
import { Input } from "./index";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

function MessageInput({ classname, colorThemeCode,messageData }) {
  const [message , setMessage]=useState('')





  const handleMessage =(e)=>{
    setMessage(e)
  }
  return (
    <div className="h-full w-full flex items-center justify-around ">
      <button
        className={` w-10 h-10 rounded-full flex items-center justify-center`}
        style={{ background: colorThemeCode }}
      >
        <FaPlus className="text-xl" />
      </button>
      <div className="w-[65%] lg:w-[90%] ">
        <Input
          classname="w-full border-none h-10 rounded-xl pl-4  text-white placeholder-white"
          placeholder="Enter Your Message"
          bgcolor={colorThemeCode}
          name={'message'}
          value={message}
          onchange={handleMessage}
          required
        />

      </div>
      <button
        className=" w-10 h-10 rounded-full flex items-center justify-center "
        style={{ background: colorThemeCode }}
        onClick={()=>{
          messageData(message)
          setMessage('')
        }}
        
      >
        <IoIosSend className="text-xl" />
      </button>
    </div>
  );
}

export default MessageInput;
