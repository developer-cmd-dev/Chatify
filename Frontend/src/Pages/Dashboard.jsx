import React from "react";
import { ChatMainContainer, ProfileContainer,RandomPosts } from "../Components/index";
import LeftDashBoard from "../Components/LeftDashBoard";

function Dashboard() {
  return (
    <>
      <LeftDashBoard />
      <RandomPosts/>
      <ProfileContainer />
    </>
  );
}

export default Dashboard;
