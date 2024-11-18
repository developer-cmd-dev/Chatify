import React, { useEffect, useState } from "react";
import { Chat, MessageInput, UserJoined } from "../Components";
import { useSelector } from "react-redux";
import { getSocket, disconnectSocket } from "../Features/SocketConnection";

function ChatPage() {
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const socket = getSocket();
  const [userMessage, setUserMessage] = useState("");




  const message = (value) => {
    setUserMessage(value);
    socket.emit('new-message',value)
  };

  // useEffect(()=>{
  //   socket.on('user-message',message=>{
  //    console.log(message)
  //   })
  // },[socket])

  return (
    <div className="h-[calc(100vh-10vh)] flex   ">
      {/* <div
        className={`hidden userJoinded w-[30%] h-[calc(100vh-10vh)] p-5 ${isDarkMode?'bg-black':'bg-white'} 
                      lg:block`}
      >
        <UserJoined classname={`h-full border-4 ${isDarkMode?'border-gray-900':'border-gray-300'} rounded-2xl p-4 flex items-start justify-center`} colortheme={colorTheme} />
      </div> */}

      <div className="bg-gray-400 w-full ">
        <div
          className={`chatContainer h-[calc(90vh-10vh)]  overflow-y-auto p-4 lg:pt-8  ${
            isDarkMode ? "bg-black" : "bg-white"
          } `}
        >
          <div className={`text-white border flex items-center justify-start`}>
            <p
              style={{
                background: colorTheme,
              }}
              className={`  min-w-[10%] max-w-fit p-2 rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl `}
            >
              Lorem ipsum dolor{" "}
            </p>
          </div>
        </div>
        <div
          className={`messageInputContainer text-white h-[10vh]   ${
            isDarkMode ? "bg-black" : "bg-white"
          }`}
        >
          <MessageInput colorThemeCode={colorTheme} messageFunc={message} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
