import { useDispatch, useSelector } from "react-redux";
import { Input, ShowPassword } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function LoginForm({ handleLoginForm }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [showPassword,setShowPassword] = useState(false)
  const inputRef = useRef()
  const [userObj,setUserObj]=useState({
    username:'',
    password:''
  })
  const handleChange = (e)=>{
    const {name,value} = e.target
    setUserObj({...userObj,[name]:value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    handleLoginForm(userObj)
  }
  const handleShowPassword = (value)=>{
    setShowPassword((prev)=>!prev)
  }

  return (
    <div
      className={`flex  items-center justify-center w-full  h-[30vh]   rounded-xl p-6
                    sm:w-[60vw]
                    md:w-[40vw]
                    lg:h-[40vh] lg:w-[30vw]
                     `}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-around w-full h-full 
                        sm:flex-col sm:items-center sm:justify-around 
                        md:flex-col md:h-64
                        lg:flex-col lg:justify-around lg:items-center  lg:h-full lg:w-[40vw]   "
      >
        <div className="  h-[30vh] w-full flex items-start justify-around flex-col">
          <label
            htmlFor="username"
            className="bg-[#C98860] p-1  px-2 rounded-xl"
          >
            Username*
          </label>
          <input
          onChange={handleChange}
          value={userObj.username}
            className={`w-[80%] border-2 h-10 pl-2 rounded-xl outline-none`}
            type="text"
            name="username"
            id="username"
            placeholder="Enter username"
            required
           
          />
          <label
            htmlFor="password"
            className="bg-[#C98860] p-1 px-2 rounded-xl"
          >
            Password
          </label>
          <div className=" w-[80%] flex items-center relative">
          <input
          onChange={handleChange}
          value={userObj.password}
            className={`w-full border-2 h-10 pl-2 rounded-xl text-black outline-none`}
            type={showPassword?'text':'password'}
            name="password"
            id="password"
            placeholder="Password"
            minLength={8}
            maxLength={8}
            required
            ref={inputRef}
          />
          <ShowPassword handleShowPassword={handleShowPassword} inputref={inputRef}/>
          
          </div>
          
          <div className=" w-full flex items-center justify-between">
            <input
              className={`bg-gray-400 text-white w-28 h-8 rounded-xl cursor-pointer hover:bg-blue-400 hover:text-white transition-all`}
              type="submit"
              value="Login"
            />
            <div className="flex text-black">
              <p>Don't have an account-</p>
              <Link className="text-blue-400" to="/register">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
