import { useDispatch, useSelector } from "react-redux";
import { ShowPassword } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

function RegisterForm({handleRegisterForm,loading}) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const inputPassword = useRef()
  const inputConfirmPassword= useRef()
  const [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };
  const handleShowPassword = (value) => {
    
    if(value == 'password'){
      setShowPassword((prev) => !prev);
    }else{
      setShowConfirmPassword((prev)=>!prev)
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
 
     confirmPassword ? handleRegisterForm(userObj):inputRef.current.focus()
   
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
        onSubmit={(e) => handleSubmit(e)}
        aria-disabled={loading?true:false}
        className=" w-[90%] h-full   flex items-center justify-center
                      sm:flex-col sm:items-center sm:justify-around 
                      md:flex-col md:h-64
                      lg:flex-col lg:justify-around lg:items-start  lg:h-[60vh] lg:w-[90%]"
      >
        <label htmlFor="">Name*</label>
        <input
          required
          value={userObj.fullname}
          onChange={handleChange}
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
          type="text"
          name="fullname"
          id="fullname"
          placeholder="Full Name"
        />
        <label htmlFor="">Email*</label>

        <input
          required
          value={userObj.email}
          onChange={handleChange}
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
          type="email"
          name="email"
          id="email"
          placeholder="Email"
        />
        <label htmlFor="">User Name*</label>

        <input
          required
          value={userObj.username}
          onChange={handleChange}
          className={`w-[60%] h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
          type="username"
          name="username"
          id="username"
          placeholder="User Name"
        />
        <label htmlFor="">Password*</label>
        <div className="w-[60%] relative  flex items-center">
          <input
            required
            value={userObj.password}
            minLength={8}
            maxLength={8}
            onChange={handleChange}
            className={`w-full h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            placeholder="New Password"
            ref={inputPassword}
          />
          <ShowPassword handleShowPassword = {handleShowPassword} inputref={inputPassword}/>

        </div>

        <div className="  w-full  flex items-center justify-between h-fit rounded-md">
         
            <div className=" w-[50%]">
            <label htmlFor="">Confirm Password*</label>
            <div className="relative flex items-center">
            <input
              required
              onChange={(e) =>
                  setConfirmPassword(userObj.password.includes(e.target.value))
              }
              minLength={8}
              maxLength={8}
              className={`w-full h-10 rounded-xl pl-3  border-2 focus outline-none`}
              type={!showConfirmPassword?'password':'text'}
              name="confirmpassword"
              id="confirmpassword"
              placeholder="Confirm Password"
              ref={inputConfirmPassword}
              style={{
                border: !confirmPassword ? "1px solid red" : "1px solid gray",
              }}
            />
            <ShowPassword handleShowPassword = {handleShowPassword} inputref={inputConfirmPassword}/>
            </div>
         
            </div>
     
    

          <div className=" h-full flex items-center justify-around w-[40%]">
            <label
              htmlFor=""
              className="bg-gray-400 w-20 flex items-center justify-center rounded-full "
            >
              Gender
            </label>
            <select
              onChange={handleChange}
              name="gender"
              id="gender"
              value={userObj.gender}

              className=" bg-white rounded-md text-black border"
            >
              <option  value="Male">Male</option>
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
            <p>Already have an account-</p>
            <Link className="text-blue-600" to={"/"}>
              {" "}
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;
