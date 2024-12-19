import React, { useEffect, useState } from "react";
import { HeroSection } from "../Components/index";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import {
  connectSocket,
  getSocket,
  disconnectSocket,
  useDisconnectSocket,
} from "../utils/SocketConnection";
import { apiRequest } from "../utils/axiosHandler";

function HomePage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state) => state.UserData);
  const location = useLocation();

  (async () => {
    try {
      const res = await disconnectSocket(userData._id,location.pathname,'patch');
      console.log(res)
    } catch (error) {
      console.log(error);
    }
  })();

  

  const handleConnectSocket = async () => {
    try {
      const socket = await connectSocket();
      console.log("socket is connected");
      socket.emit("user-joined", userData);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className={`${
        isDarkMode ? "bg-black " : "bg-white"
      } h-[calc(100vh-10vh)] flex items-center justify-around  text-black`}
    >
      <div className=" hidden lg:block">
        <HeroSection />
      </div>

      <span className="h-[50%] hidden lg:block bg-gray-300 w-1 rounded-full"></span>

      <div className="w-[98%] sm:w-[50%] md:[30%] lg:[30%] h-full  flex flex-col items-center justify-center">
        <Outlet context={{ makeSocketConnection: handleConnectSocket }} />
      </div>
    </div>
  );
}

export default HomePage;
