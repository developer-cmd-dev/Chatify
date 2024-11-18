import React, { useEffect } from "react";
import {
  Children,
  Header,
  LoginForm,
  IllustrationPoster,
} from "../Components/index";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate, useParams } from 'react-router-dom';
import {connectSocket,getSocket} from '../Features/SocketConnection'


function LoginPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const email = useSelector((state)=>state.Login.email)
  const navigate = useNavigate()

  
  useEffect(()=>{
    if(email){
      connectSocket("http://localhost:3001")
      const socket = getSocket()     
      socket.emit('new-user-joined',email)
      navigate(`/global-chat/${email}`)
    }
  },[email])

  return (
    <div
      className={`h-[calc(100vh-10vh)] flex flex-col items-center justify-around px-5 ${
        isDarkMode ? "bg-black" : "bg-white"
      }
                    sm:flex sm:items-center sm:justify-around sm:flex-col-reverse
                    md:flex-col-reverse
                    lg:flex lg:flex-row`}
    >
      <IllustrationPoster />
      <LoginForm />
    </div>
  );
}

export default LoginPage;
