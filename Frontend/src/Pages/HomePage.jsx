import React, { useEffect, useState } from "react";
import { HeroSection } from "../Components/index";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import {handleSuccess,handleError} from '../utils/toastify'
import {
  connectSocket,
  disconnectSocket,
  
} from "../utils/SocketConnection";
import { apiRequest } from "../utils/axiosHandler";

function HomePage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state) => state.UserData);

  useEffect(()=>{
    (async () => {
      try {
        const res = await disconnectSocket('/set-user-offline','patch',userData._id);
        console.log(res)
      } catch (error) {
        return handleError(error.message);
      }
    })();
  },[])

  

  const handleConnectSocket = async () => {
    try {
      const socket = await connectSocket();
      socket.emit("user-joined", userData);
      const res = await apiRequest('api/v1/set-user-online','patch',{_id:userData._id});
      return handleSuccess(`${userData.username} is joined the Global chat`)
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-black " : "bg-white"
      }  h-[calc(100vh-10vh)] flex items-center justify-around  text-black`}
    >
      <div className=" hidden lg:block  w-[50%]">
        <HeroSection />
      </div>

      <span
          className={` w-[90%]  h-0 border-2 hidden lg:block ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          } rounded-full
                        md:w-0 md:h-[50%] `}
        ></span>
      <div className="w-[90%]  sm:w-[50%] md:[30%] lg:w-[40vw]   h-full  flex flex-col items-center justify-center">
        <Outlet context={{ makeSocketConnection: handleConnectSocket }} />
      </div>
    </div>
  );
}

export default HomePage;
