import React, { useEffect, useState } from "react";
import { HeroSection } from "../Components/index";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { connectSocket } from "../utils/SocketConnection";

function HomePage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state)=>state.UserData)

  ;(async()=>{
    try {
      const socket = await connectSocket()
      socket.emit('user-joined',userData)
    } catch (error) {
      console.log(error.response)
    }
  })()


  return (
    <div
      className={`${
        isDarkMode ? "bg-black " : "bg-white"
      } h-[calc(100vh-10vh)] flex items-center justify-around  text-black`}
    >
      <div className=" hidden lg:block">
        <HeroSection />
      </div>
  
      <span className="h-[50%] bg-gray-300 w-1 rounded-full"></span>
    

      <div className="w-[98%] sm:w-[50%] md:[30%] lg:[30%] h-full  flex flex-col items-center justify-center">
       
        <Outlet />
       
      </div>
    </div>
  );
}

export default HomePage;
