import { useDispatch, useSelector } from "react-redux";
import { ShowPassword, ErrorMsg } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { setError } from "../Features/ErrorSlice";

function RegisterForm({ handleRegisterForm, loading }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const { isError, status, message } = useSelector((state) => state.ErrorState);
  const [confirmPassword, setConfirmPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const location = useLocation();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const dispatch = useDispatch();
  const [userObj, setUserObj] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    gender: "Male",
  });

  useEffect(() => {
    dispatch(setError({ status: null, message: "", isError: false }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };
  const handleShowPassword = (value) => {
    if (value == "password") {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    confirmPassword ? handleRegisterForm(userObj) : inputRef.current.focus();
  };
  return (
    <div
      className={` ${
        isDarkMode ? "text-white" : "text-black"
      } flex flex-col items-center justify-around w-full h-[80vh]   rounded-xl p-6
                  sm:w-[60vw] 
                  md:w-[50vw] 
                  lg:h-[80vh] lg:w-[30vw] 
                   `}
    >
      <div
        className={`  w-[80%] h-16  flex items-start justify-center text-xl font-gugi font-bold border-b-2 border-gray-800 text-gray-700 lg:text-2xl`}
       >
        <h1>Create your Account</h1>
      </div>
      {isError && (
        <ErrorMsg
          className={` rounded-lg w-[90%] mt-5 h-10  bg-red-600 flex items-center justify-center text-white`}
          message={message}
          statusCode={status}
        />
      )}

      <form
        onSubmit={(e) => handleSubmit(e)}
        aria-disabled={loading ? true : false}
        className=" w-full h-full   flex flex-col items-start justify-around
                      sm:flex-col sm:items-center sm:justify-around 
                      md:flex-col 
                      lg:h-[60vh] lg:w-[90%]"
      >
        <div className="fullname w-full">
          <label htmlFor="fullname" id="fullname">Name*</label>
          <input
            required
            value={userObj.fullname}
            onChange={handleChange}
            className={`w-full h-10  ${
              isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
            } rounded-xl pl-3  border-gray-300 border-2 outline-none`}
            type="text"
            name="fullname"
            id="fullname"
            placeholder="Full Name"
          />
        </div>

        <div className="email w-full">
          <label htmlFor="email" id="email">Email*</label>
          <input
            required
            value={userObj.email}
            onChange={handleChange}
            className={`w-full  ${
              isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
            } h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
          />
        </div>

        <div className="username w-full">
          <label htmlFor="username" id="username">User Name*</label>

          <input
            required
            value={userObj.username}
            onChange={handleChange}
            className={`w-full  ${
              isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
            } h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
            type="username"
            name="username"
            id="username"
            placeholder="User Name"
          />
        </div>

        <div className="password w-full">
          <label htmlFor="password" id="password">Password*</label>
          <div className="w-full relative  flex items-center">
            <input
              required
              value={userObj.password}
              minLength={8}
              maxLength={8}
              onChange={handleChange}
              className={`w-full  ${
                isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
              } h-10 rounded-xl pl-3  border-gray-300 border-2 outline-none`}
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="New Password"
              ref={inputPassword}
            />
            <ShowPassword
              handleShowPassword={handleShowPassword}
              inputref={inputPassword}
            />
          </div>
        </div>

        <div className=" confirmPassword  w-full  flex flex-col items-center justify-between h-28 rounded-md">
          <div
            className=" w-full
            "
          >
            <label htmlFor="confirmpassword" id="confirmpassword">Confirm Password*</label>
            <div className="relative flex items-center">
              <input
                required
                onChange={(e) =>
                  setConfirmPassword(userObj.password.includes(e.target.value))
                }
                minLength={8}
                maxLength={8}
                className={`w-full  ${
                  isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
                } h-10 rounded-xl pl-3  border-2 focus outline-none`}
                type={!showConfirmPassword ? "password" : "text"}
                name="confirmpassword"
                id="confirmpassword"
                placeholder="Confirm Password"
                ref={inputConfirmPassword}
                style={{
                  border: !confirmPassword && "2px solid red",
                }}
              />
              <ShowPassword
                handleShowPassword={handleShowPassword}
                inputref={inputConfirmPassword}
              />
            </div>
          </div>

          <div className="  h-full flex items-center justify-around w-full">
            <label
              htmlFor="gender"
              id="gender"
              className={`${
                isDarkMode ? "bg-blue-500" : "bg-gray-800"
              } text-white w-20 flex items-center justify-center rounded-full `}
            >
              Gender
            </label>
            <select
              onChange={handleChange}
              name="gender"
              id="gender"
              value={userObj.gender}
              className={`  rounded-md text-black border`}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>
        <div className=" w-full  flex items-center justify-between">
          <input
            type="submit"
            name="submit"
            id="submit"
            value="Register"
            className=" bg-green-400 w-[40%] h-9 rounded-xl cursor-pointer text-white text-sm"
          />
          <div className="flex text-[0.7em] sm:text-[0.9em]  w-[full] items-center justify-center">

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
