import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MessageCategory, NotificationContainer } from "./index";

function LeftDashBoard({children}) {
  return <Outlet/>;
}

export default LeftDashBoard;
