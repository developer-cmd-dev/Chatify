import React from "react";
import {
  MessageCategory,
  ChatMainContainer,
  ProfileContainer,
} from "../Components";
import { Outlet } from "react-router-dom";

function MainContainer() {
  return (
    <>
      {/* Message category Container */}
      
      <Outlet/>
      {/* Chat Container */}
      <ChatMainContainer />
      {/* Profile container */}
      <ProfileContainer />
    </>
  );
}

export default MainContainer;
