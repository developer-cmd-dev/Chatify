import React from "react";
import { ChatMainContainer, ProfileContainer } from "../Components/index";
import LeftDashBoard from "../Components/LeftDashBoard";

function Dashboard() {
  return (
    <>
      <LeftDashBoard />
      <ChatMainContainer />
      <ProfileContainer />
    </>
  );
}

export default Dashboard;
