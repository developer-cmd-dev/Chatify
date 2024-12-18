import React, { useEffect, useRef, useState } from "react";
import { MessageInput, UserJoined } from "../Components";
import { useSelector,useDispatch } from "react-redux";
import { connectSocket, getSocket } from "../utils/SocketConnection";
import { isAuthenticated } from "../Features/AuthenticateSlice";

function ChatPage() {
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const isAuthenticate = useSelector((state)=>state.Authenticate);
  const dispatch = useDispatch()

  const [data, setData] = useState([]);
  const [activeUsers, setActiveusers] = useState([]);
  const [yourData, setYourData] = useState({});

// useEffect(()=>{
// window.addEventListener('beforeunload',async()=>{
//   dispatch(isAuthenticated({authenticate:false,email:""}))
//   const socket = await getSocket()
//   if(socket){
//     socket.emit('logout',isAuthenticate.email)
//   }
// })
// console.log(isAuthenticate.email)
// },[])


  useEffect(() => {
    const initializeSocket = async () => {
      const socket = await getSocket();
      if (socket) {
        socket.on("joined-users", (usersArr) => {
          setActiveusers(usersArr);
          console.log(usersArr)
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

        socket.on("your-data", (data) => {
          setYourData(data);
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
      username: yourData.username,
      iconColor : yourData.iconColor
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
                        className={`w-full flex item-center  ${
                          dataValue.type == "my-message"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="flex items-center justify-center">
                          <span className={`h-10 w-10 rounded-full flex items-center justify-center `} style={{backgroundColor:dataValue.iconColor}} >
                            {dataValue.username.slice(0,1)}
                          </span>
                          <div
                            className={`min-w-[10%] max-w-fit p-2 mb-1   rounded-md`}
                            style={{
                              backgroundColor: dataValue.iconColor,
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
          <MessageInput colorThemeCode={colorTheme} messageFunc={message} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
