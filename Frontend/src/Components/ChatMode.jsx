import React, { useEffect, useLayoutEffect } from "react";
import { NavLink, useOutletContext } from "react-router-dom";

function ChatMode() {
  const {makeSocketConnection} = useOutletContext()

  return (
    <div
      className={`h-[40%] w-full lg:w-[50%]  border-4 text-xl font-semibold text-white font-montserrat border-gray-400 rounded-3xl rounded-bl-none flex flex-col
       
            items-center justify-around`}
    >
      <NavLink
        to={"/global-chat-room"}
        onClick={()=>makeSocketConnection()}
        className={`  w-[60%] h-[20%] 
          bg-blue-400
           rounded-full rounded-bl-none flex items-center justify-center`}
      >
        Global Chat
      </NavLink>
      <NavLink
        to={"private-chat-room"}
        className={`  w-[60%] h-[20%] 
          bg-blue-400
           rounded-full rounded-bl-none flex items-center justify-center`
        }
      >
        Private Chat
      </NavLink>
    </div>
  );
}

export default ChatMode;
