import React, { useEffect, useId, useRef, useState } from "react";
import { MessageInput, UserJoined,ChatContainer } from "../Components";
import { useSelector,useDispatch } from "react-redux";
import {  disconnectSocket, getSocket } from "../utils/SocketConnection";
import {apiRequest} from '../utils/axiosHandler'
import { setProgress } from "../Features/TopLoaderSlice";
import { useLocation, useResolvedPath } from "react-router-dom";

function ChatPage() {

  const dispatch = useDispatch()
  const location = useLocation()
  const userData = useSelector((state)=>state.UserData)
  const [activeUsers,setActiveusers]=useState([])


//  Close window page 
  // useEffect(() => {
  //   const handleBeforeUnload =async (e) => {
  //     e.preventDefault()
  //     try {
  //       const socket = await getSocket()
  //       socket.emit('left-user',userData)
  //   } catch (error) {
  //     console.log(error);
      
  //   }
  //     disconnectSocket('/home','patch',userData._id)
   
  //   };
    
  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, []);





// Get socket and handle socket events.
useEffect(()=>{
  ;(async()=>{
  try {
      const socket = await getSocket();
      socket.on('new-user-joined',data=>{
        setActiveusers((prev)=>[...prev,data])
      })

      socket.on('offline',data=>{
        const onlineUsers = activeUsers
        console.log(data)
       setActiveusers(onlineUsers)
      })
  } catch (error) {
    console.log(error)
  }
  })()

},[])



// Fetch active users from db.
  useEffect(()=>{
    ;(async()=>{
      try {
        const response = await apiRequest(`api/v1/active-users`,'post',null);
        console.log(response)
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
      <ChatContainer/>
      </div>
    </div>
  );
}

export default ChatPage;
