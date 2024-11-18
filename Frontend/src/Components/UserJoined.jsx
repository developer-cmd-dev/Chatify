import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {io} from 'socket.io-client'

function UserJoined({ classname, colortheme }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);

  return (
    <div className={`${classname}`}>
      <div
        style={{
          background: isDarkMode
            ? "rgb(15 23 42 / var(--tw-bg-opacity))"
            : colortheme,
          
        }}
        className={`users text-white w-[100%] lg:w-full h-[6vh] bg-black  lg:h-[10vh] lg:bg- rounded-xl flex items-center justify-around   `}
      >
        <div className=" w-full lg:w-[85%] flex items-center justify-around ">
          <div className="w-4 h-4 bg-green-600 rounded-full "></div>
          <p className="text-sm lg:text-xl">devkmandal@gmail.com</p>
        </div>
      </div>
    </div>
  );
}

export default UserJoined;
