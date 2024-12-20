import React, { useEffect, useRef, useState } from "react";
import { MessageInput, UserJoined } from "../Components";
import { useSelector,useDispatch } from "react-redux";
import { connectSocket, getSocket } from "../utils/SocketConnection";
import { isAuthenticated } from "../Features/AuthenticateSlice";
import {apiRequest} from '../utils/axiosHandler'
import { setProgress } from "../Features/TopLoaderSlice";
import { useLocation } from "react-router-dom";

function ChatPage() {
  const colorTheme = useSelector((state) => state.colorThemeChange.colorCode);
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const isAuthenticate = useSelector((state)=>state.Authenticate);
  const dispatch = useDispatch()
  const location = useLocation()

  const [data, setData] = useState([]);
  const [activeUsers, setActiveusers] = useState([]);
  const [yourData, setYourData] = useState({});
  const userData = useSelector((state)=>state.UserData)

useEffect(()=>{
  ;(async()=>{
      try {
        let socket = await getSocket();
        if(!socket){
          socket = await connectSocket();
          console.log("socket is connected");
          socket.emit("user-joined",userData );
          socket.on('new-user-joined',data=>{
            console.log(data)
          })
        }
       
      } catch (error) {
        console.log(error);
      }
  })()

},[])


  useEffect(()=>{
    ;(async()=>{
      try {
        const onProgress = (progressevent)=>{
          const response = Math.round((progressevent.process * 100)/progressevent.total)
          if(response >=90){
            dispatch(setProgress(response))
          }
        }
  
        const response = await apiRequest(`/api/v1${location.pathname}`,'patch',{_id:userData._id});
        setActiveusers(response.data.data)
  
  
      } catch (error) {
        console.log(error)
      }
    })()
   
  },[])






  

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
          <MessageInput colorThemeCode={colorTheme} messageFunc={''} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
