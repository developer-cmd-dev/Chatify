import React, { useEffect, useState } from "react";
import { Chat, MessageInput, UserJoined } from "../Components";
import { useSelector } from "react-redux";
import { connectSocket, getSocket } from "../utils/SocketConnection";
import { Navigate, useNavigate } from "react-router-dom";

function ChatPage() {
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [data, setData] = useState([]);
  const [yourData, setYourdata] = useState({});
  const [activeUsers, setActiveusers] = useState([]);
  const [newUser, setNewUser] = useState("");

  useEffect(() => {
    const initializeSocket = async () => {
      const socket = await connectSocket();
      if (socket) {
        socket.on("joined-users", (usersArr) => {
          setActiveusers(usersArr);
        });

        socket.on("new-user-joined", (userObj) => {
          setData((prev) => [
            ...prev,
            {
              type: "new-user-joined",
              id: userObj.id,
              username: userObj.username,
              iconColor: userObj.iconColor,
            },
          ]);
          setActiveusers((prev) => [...prev, userObj]);
        });

        socket.on("user-message", (msgObj) => {
          setData((prev) => [...prev, msgObj]);
        });
      }
      return socket;
    };
    initializeSocket();
  }, []);

  const message = async (value) => {
    const socket = await connectSocket();
    const msgObj = {
      type: "my-message",
      id: yourData.id,
      msg: value,
    };
    if (socket) {
      socket.emit("send-message", msgObj);
    }
    setData((prevMessage) => [...prevMessage, msgObj]);
  };

  return (
    <div className="h-[calc(100vh-10vh)] flex   ">
      <UserJoined classname={" w-[12vw]"} activeUsers={activeUsers} />

      <div className="bg-gray-400 w-full  ">
        <div
          className={`chatContainer h-[calc(90vh-10vh)]  overflow-y-auto p-4 lg:pt-8  ${
            isDarkMode ? "bg-black" : "bg-white"
          } `}
        >
          <div className={`text-white  flex flex-col items-end `}>
            {data.length > 0
              ? data.map((dataValue, index) => {
                  if (
                    dataValue.type == "my-message" ||
                    dataValue.type == "user-message"
                  ) {
                    return (
                      <div
                        key={index}
                        className={`w-full flex item-center ${
                          dataValue.type == "my-message"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <p
                          style={{
                            background: colorTheme,
                          }}
                          className={`  min-w-[10%] max-w-fit p-2 mb-1 ${
                            dataValue.type == "my-message"
                              ? "rounded-tl-2xl rounded-tr-none rounded-bl-2xl rounded-br-2xl"
                              : "rounded-tl-none rounded-tr-2xl rounded-bl-2xl rounded-br-2xl"
                          } `}
                        >
                          {dataValue.msg}
                        </p>
                      </div>
                    );
                  }
                  if (dataValue.type == "new-user-joined") {
                    return (
                      <div
                        key={dataValue.id}
                        className={
                          "userJoinedMessage  text-black w-full mt-2 mb-2 text-sm p-1 rounded-md"
                        }
                        style={{
                          backgroundColor:dataValue.iconColor
                        }}
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
          <MessageInput colorThemeCode={colorTheme} messageFunc={message} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
