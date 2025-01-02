import  { useEffect, useState } from "react";
import { getSocket } from "../utils/SocketConnection";
import { useSelector } from "react-redux";
import { MessageInput } from "./index";
import { Avatar } from "@nextui-org/react";
import {  } from "@nextui-org/react";

function ChatContainer() {
  const [message, setMessage] = useState([]);
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state) => state.UserData);

  useEffect(() => {
    (async () => {
      try {
        const socket = await getSocket();
        socket.on("message", (data) => {
          console.log(data);
          setMessage((prev) => [...prev, data]);
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const messageData = async (data) => {
    const socket = await getSocket();
    let msgObj = {
      msg: data,
      username: userData.username,
      type: "my-message",
      userIconColor: userData.userIconColor,
    };
    socket.emit("chat:message", msgObj);
    setMessage((prev) => [...prev, msgObj]);
  };

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
                      <div className="flex items-center justify-center ">
                       
                          <Avatar
                            className={`bg-slate-800 m-2 text-white`}
                            size="md"
                            name={userData.fullname}
                            radius="full"
                            src={`${
                              userData.avatar.length <= 0 ? "" : userData.avatar
                            }`}
                          />
                 
                        <div
                          className={`min-w-24 max-w-fit p-2 mb-1  bg-blue-900  rounded-md`}
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
