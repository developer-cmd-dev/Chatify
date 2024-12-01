import { useDispatch, useSelector } from "react-redux";
import { Input } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";

function LoginForm({ handleSubmit }) {
  const [userName, setUserName] = useState("");
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);


  const handleUserName = (e) => {
    setUserName(e);
  };

  return (
    <div
      className={`flex  items-center justify-center w-full ${
        isDarkMode ? "bg-darkLoginFormBg" : "bg-loginFormBg"
      } bg-center bg-no-repeat bg-cover  h-[30vh]   rounded-xl p-6
                    sm:w-[60vw]
                    md:w-[40vw]
                    lg:h-[50vh]
                     `}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(userName);
          setUserName("")
        }}
        className="flex flex-col items-center justify-around w-full h-full 
                        sm:flex-col sm:items-center sm:justify-around 
                        md:flex-col md:h-64
                        lg:flex-col lg:justify-around lg:items-center  lg:h-full lg:w-[40vw]    "
      >
        <Input
          placeholder={"Enter Your Email@"}
          classname={` w-full h-[6vh] rounded-xl p-3
                        sm:h-[8vh] sm:w-[90%]
                        lg:w-full lg:h-[10vh]`}
          type="email"
          name="username"
          value={userName}
          onchange={handleUserName}
          required
        />
        <button
          type="submit"
          className={`cursor-pointer  w-32 h-[6vh] rounded-xl border-none ${
            isDarkMode ? "bg-[#2C4C9F]" : "bg-[#b15232]"
          } text-white hover:bg-green-500 transition-all
          sm:h-[6vh] sm:text-xl sm:w-44
          lg:h-[10vh] `}
        >
          Join Chat.
        </button>
      </form>
    </div>
  );
}

export default LoginForm;
