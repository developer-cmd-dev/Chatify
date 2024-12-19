import { useEffect, useState } from "react";
import "./App.css";
import io, { Socket } from "socket.io-client";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import { Header } from "./Components";
import { useSelector } from "react-redux";
import axios from "axios";
function App() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const location = useLocation()
  const hideHeaderPath = []
  const shouldshowHeader = !hideHeaderPath.includes(location.pathname)


  return (
    <div
      className="
    overflow-hidden
    "
    >
   { shouldshowHeader &&  <Header
        logo={true}
        colorPallete={true}
        darkModeButton={true}
        classname={`${isDarkMode ? "bg-black" : "bg-white"}  h-[10vh] w-full `}
        hamburger={true}
      />}

      <main className="h-[calc(100vh-10vh)] w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
