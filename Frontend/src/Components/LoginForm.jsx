import { useDispatch, useSelector } from "react-redux";
import { Input } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm({ handleSubmit }) {
  const [userName, setUserName] = useState("");
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);


  const handleUserName = (e) => {
    setUserName(e);
  };

  return (
    <div
      className={`flex  items-center justify-center w-full  h-[30vh]   rounded-xl p-6
                    sm:w-[60vw]
                    md:w-[40vw]
                    lg:h-[40vh] lg:w-[30vw]
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
                        lg:flex-col lg:justify-around lg:items-center  lg:h-full lg:w-[40vw] text-white   "
      >
      <div className="  h-[30vh] w-full flex items-start justify-around flex-col">
        <label htmlFor="username" className="bg-[#C98860] p-1  px-2 rounded-xl">Username*</label>
        <input className={`w-[80%] border-2 h-10 pl-2 rounded-xl`} type="text" name="username" id="username" placeholder="Enter username"/>
        <label htmlFor="password" className="bg-[#C98860] p-1 px-2 rounded-xl">Password</label>
        <input className={`w-[80%] border-2 h-10 pl-2 rounded-xl`} type="password" name="password" id="password" placeholder="Password" />
        <div className=" w-full flex items-center justify-between">
        <input className={`bg-gray-400 text-white w-28 h-8 rounded-xl cursor-pointer hover:bg-blue-400 hover:text-white transition-all`} type="submit" value='Login' />
        <div className="flex text-black">
          <p >Don't have an account-</p><Link className="text-blue-400" to='/login/register'>Sign up</Link>
        </div>
        </div>
       
      </div>
      
      </form>
    </div>
  );
}

export default LoginForm;
