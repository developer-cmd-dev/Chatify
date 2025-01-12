import React from "react";
import {
  MessageCategory,
  ProfileContainer,
  
} from "../Components";
import { Outlet } from "react-router-dom";

function MainContainer() {
  return (
    <>
        <MessageCategory/>
        <Outlet/>
        <ProfileContainer/>
    </>
  );
}

export default MainContainer;
