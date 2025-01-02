import React, { useEffect, useState } from "react";
import { getSocket } from "../utils/SocketConnection";
import { useSelector } from "react-redux";
import {MessageInput} from './index'

function ChatContainer() {
  const [message, setMessage] = useState([]);
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state)=>state.UserData)

  useEffect(() => {
    (async () => {
      try {
        const socket = await getSocket();
        socket.on("message", data => {
        console.log(data)
          setMessage((prev) => [...prev, data]);
        });
      } catch (error) {
      }
    })();
  },[]);


  const messageData =async (data)=>{
    const socket = await getSocket()
    let msgObj = {msg:data,username:userData.username,type:'my-message',userIconColor:userData.userIconColor}
    socket.emit('chat:message',msgObj);
    setMessage((prev)=>[...prev,msgObj])
  }

  return (
    <>
      <div
        className={`chatContainer h-[calc(90vh-10vh)]  overflow-y-auto p-4 lg:pt-8  ${
          isDarkMode ? "bg-black" : "bg-white"
        } `}
      >
        <div className={`text-white  flex flex-col items-end `}>
          {message.length > 0
            ? message.map((dataValue, index) => {
                if (
                  dataValue.type == "my-message" ||
                  dataValue.type == "user-message"
                ) {
                  return (
                    <div
                      key={index}
                      className={`w-full flex item-center  ${
                        dataValue.type == "my-message"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div className="flex items-center justify-center">
                        <span
                          className={`h-10 w-10 rounded-full flex items-center justify-center bg-${dataValue.userIconColor} `}
                          style={{ backgroundColor: dataValue.userIconColor }}
                        >
                          {dataValue.username.slice(0, 1)}
                        </span>
                        <div
                          className={`min-w-[10%] max-w-fit p-2 mb-1   rounded-md`}
                          style={{
                            backgroundColor: dataValue.userIconColor,
                          }}
                        >
                          <p className="text-[0.8rem] italic">
                            {dataValue.username}
                          </p>
                          <p className={`   `}>{dataValue.msg} </p>
                        </div>
                      </div>
                    </div>
                  );
                }
                if (dataValue.type == "new-user-joined") {
                  return (
                    <div
                      key={dataValue.id}
                      className={
                        "userJoinedMessage  text-black w-[50%] h-9 flex items-center mt-2 mb-2 text-sm p-1 rounded-md bg-green-200 "
                      }
                    >
                      <p>{dataValue.username} has joined the chat.</p>
                    </div>
                  );
                }
              })
            : null}
        </div>
      </div>
      <div
        className={`messageInputContainer text-white h-[10vh]   ${
          isDarkMode ? "bg-black" : "bg-white"
        }`}
      >
        <MessageInput colorThemeCode={colorTheme} messageData={messageData} />
      </div>
    </>
  );
}

export default ChatContainer;
