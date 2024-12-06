import { useDispatch, useSelector } from "react-redux";
import { Input } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function RegisterForm() {
  const [userName, setUserName] = useState("");
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);

  const handleUserName = (e) => {
    setUserName(e);
  };
  return (
    <div
      className={`flex flex-col  border-gray-300  items-center justify-around w-full  h-[30vh]   rounded-xl p-6
                  sm:w-[60vw]
                  md:w-[40vw]
                  lg:h-[80vh] lg:w-[40vw] 
                   `}
    >
      <div
        className={` w-[80%] h-16  flex items-start justify-center text-2xl font-playWrite font-bold border-b-2 border-gray-300`}
      >
        <h1>Create your Account</h1>
      </div>


      <form
        className=" w-[90%] h-full   flex items-center justify-center
                      sm:flex-col sm:items-center sm:justify-around 
                      md:flex-col md:h-64
                      lg:flex-col lg:justify-around lg:items-start  lg:h-[60vh] lg:w-[90%]"
      >
        <label htmlFor="">Name*</label>
        <input
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2`}
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Full Name"
        />
        <label htmlFor="">Email*</label>

        <input
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2`}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <label htmlFor="">User Name*</label>

        <input
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2`}
          type="username"
          name="username"
          id="username"
          placeholder="User Name"
        />
        <label htmlFor="">Password*</label>
        <input
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2`}
          type="password"
          name="newpassword"
          id="newpassword"
          placeholder="New Password"
        />
      
        <div className="  w-full  flex items-center justify-between h-fit rounded-md">
          <div>
          <label htmlFor="">Confirm Password*</label>
        <input
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2`}
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          placeholder="Confirm Password" 
        />
          </div>
        
        <div className=" h-full flex items-center justify-around w-[40%]">
        <label htmlFor="" className="bg-gray-400 w-20 flex items-center justify-center rounded-full ">Gender</label>
          <select
            name="gender"
            id="gender"
            className=" bg-white rounded-md text-black border"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Others">Others</option>
          </select>
        </div>
        
        </div>
        <div className=" w-full flex items-center justify-between">
        <input
          type="submit"
          name="submit"
          id="submit"
          value="Create Account"
          className=" bg-green-400 w-[30%] h-9 rounded-xl cursor-pointer text-white"
        />
        <div className="flex">
        <p>Already have an account-</p><Link className="text-blue-600" to={'/'}> Login</Link>

        </div>
        </div>
       
      </form>
    </div>
  );
}

export default RegisterForm;
