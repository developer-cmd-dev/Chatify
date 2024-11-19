import React, { useEffect, useState } from "react";
import { Chat, MessageInput, UserJoined } from "../Components";
import { useSelector } from "react-redux";
import { getSocket } from "../utils/SocketConnection";

function ChatPage() {
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [userMessage, setUserMessage] = useState([]);
  const [userJoined, setUserJoined] = useState([]);
  const socket = getSocket()

  useEffect(()=>{
    socket.on('user-joined',email=>{
      console.log(email)
    })

  },[])






  const message = (value) => {
    setUserMessage(value);
  };



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
{     userMessage &&    <div
          className={`text-white  flex items-center ${
            userMessage ? "justify-end":"justify-start"
          }`}
        >
          <p
            style={{
              background: colorTheme,
            }}
            className={`  min-w-[10%] max-w-fit p-2 ${userMessage?"rounded-tl-2xl rounded-tr-none rounded-bl-2xl rounded-br-2xl":"rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"} `}
          >
            {userMessage}
          </p>
        </div>}
          {userJoined.length > 0
            ? userJoined.map((users, index) => (
                <div
                  key={index}
                  className={"userJoinedMessage bg-green-200 mt-2 mb-2 text-sm p-1"}
                >
                  <p>{users} has joined the chat.</p>
                </div>
              ))
            : null}
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
