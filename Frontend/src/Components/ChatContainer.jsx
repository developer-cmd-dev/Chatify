import  { useEffect, useState,useRef } from "react";
import { getSocket } from "../utils/SocketConnection";
import { useSelector } from "react-redux";
import { MessageInput } from "./index";
import { Avatar } from "@nextui-org/react";


function ChatContainer() {
  const [message, setMessage] = useState([]);
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const userData = useSelector((state) => state.UserData);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [message]); 


  useEffect(() => {
    (async () => {
      try {
        const socket = await getSocket();
        socket.on("message", (data) => {
          console.log(data);
          setMessage((prev) => [...prev, data]);
        });

        socket.on("new-user-joined",userData=>{
          let msgObj = {
            username:userData.username,
            msg:'has joined the chat.',
            type:'new-user-joined',
            userIconColor:userData.userIconColor
          }
          setMessage((prev)=>[...prev,msgObj])
        })

        socket.on("left-user",userData=>{
          let msgObj = {
            username:userData.username,
            msg:'has left the chat.',
            type:'left-user',
            userIconColor:userData.userIconColor
          }
          setMessage((prev)=>[...prev,msgObj])
        })
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const messageData = async (data,mediaData) => {
    const socket = await getSocket();
     let msgObj = {
      id:userData._id,
      msg: data,
      username: userData.username,
      type: "my-message",
      userIconColor: userData.userIconColor,
      fullname:userData.fullname,
      media:mediaData
    };
    socket.emit("chat:message", msgObj);
    setMessage((prev) => [...prev, msgObj]);
  };

  return (
    <>
      <div
        className={`chatContainer h-[calc(90vh-10vh)]  relative overflow-hidden lg:pt-8  ${
          isDarkMode ? "bg-black" : "bg-white"
        } `}
      >
        <div ref={chatContainerRef} className={`text-white  bottom-0 p-2 w-full h-fit max-h-full  flex flex-col overflow-y-auto scroll-smooth  absolute  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  ${isDarkMode &&'[&::-webkit-scrollbar-track]:bg-neutral-700 [&::-webkit-scrollbar-thumb]:bg-neutral-500'} `}>
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
                            name={dataValue.fullname}
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
                if (dataValue.type === "new-user-joined") {
                  return (
                    <div
                      key={index}
                      className={
                        "userJoinedMessage   w-full h-14 opacity-30 flex items-center mt-2 mb-2 text-sm p-1 bg-slate-900 text-white "
                      }
                    >
                      <p className={`ml-4 italic`}>{dataValue.username} {dataValue.msg}</p>
                    </div>

                    
                  );
                }

                if (dataValue.type === "left-user") {
                  return (
                    <div
                      key={index}
                      className={
                        "userJoinedMessage   w-full h-14 opacity-30 flex items-center mt-2 mb-2 text-sm p-1 bg-slate-900 text-red-300 "
                      }
                    >
                      <p className={`ml-4 italic`}>{dataValue.username} {dataValue.msg}</p>
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
