import React,{useEffect} from "react";
import { ChatMainContainer, ProfileContainer,RandomPosts,MiddleDashBoard,LeftDashBoard } from "../Components/index";
import { useSelector } from "react-redux";

function Dashboard() {
  const chatMode = useSelector((state)=>state.ChatMode.mode);
  
  

  return (
    <>
      <LeftDashBoard />
      <MiddleDashBoard>
        {!chatMode && <RandomPosts/> }
        {chatMode == 'global-chat' && <ChatMainContainer/>}
      </MiddleDashBoard>
      <ProfileContainer />
    </>
  );
}

export default Dashboard;
