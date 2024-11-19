import { useDispatch, useSelector } from "react-redux";
import { Input } from "./index";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {login} from '../Features/LoginSlice'
import { useNavigate } from "react-router-dom";
import { getSocket } from "../utils/SocketConnection";



function LoginForm() {
  const [userName, setUserName] = useState("");
  const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const socket = getSocket()




  const handleUserName = (e) => {
    setUserName(e);
  };




  const handleSubmit = (event)=>{
    event.preventDefault()
    dispatch(login(userName));
    socket.emit('new-user-joined',userName)
    navigate('global-chat')
    setUserName("")
  }

  return (
    <div
      className={`flex  items-center justify-center w-[90%] h-[25vh] border-4 ${isDarkMode?'border-gray-900':'border-gray-300'} rounded-xl p-6
                    sm:w-[90%] sm:h-fit sm:border-none
                    md:w-[80%] md:border-none 
                    lg:h-[50vh] lg:w-[90%]   ` }
    >
    
        <form onSubmit={handleSubmit} className="flex flex-col items-center justify-around w-full h-full 
                        sm:flex-row sm:justify-around sm:border-none
                        lg:flex-col lg:justify-around lg:items-center  lg:h-full lg:w-[90%]   lg:border-4 lg:border-black lg:p-8 lg:rounded-3xl ">
          <Input
            placeholder={"Enter Your Email@"}
            classname=" w-full  border-4 border-gray-300 h-[8vh] rounded-xl p-3
                        sm:h-[8vh] sm:w-[90%]
                        lg:w-full lg:h-[10vh]"
            type="email"
            name="username"
            value={userName}
            onchange={handleUserName}
            required
          />
          <button
            type="submit"
            className={`cursor-pointer  w-32 h-[6vh] rounded-xl border-none  ${isDarkMode?'bg-[#FF0082]':'bg-[#FF4F5C]'} text-white hover:bg-green-500 transition-all
          sm:h-[6vh] sm:text-xl sm:w-44
          lg:h-[10vh] `}
          >
            Join Chat.
          </button>
        </form>
      
    </div>
  );
}

export default LoginForm;
