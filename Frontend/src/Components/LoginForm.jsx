import { useDispatch, useSelector } from "react-redux";
import { Input, ShowPassword, ErrorMsg } from "./index";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useAsyncError, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { setError } from "../Features/ErrorSlice.js";

function LoginForm({ handleLoginForm, loading }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const { isError, status, message } = useSelector((state) => state.ErrorState);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const usernameRef = useRef();
  const navigate = useNavigate();
  const [userObj, setUserObj] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    dispatch(setError({ status: null, message: "", isError: false }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserObj({ ...userObj, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLoginForm(userObj);
  };
  const handleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div
      className={`flex  ${
        isDarkMode
          ? "text-white border-gray-800 border-4"
          : "text-black border-4"
      } items-center justify-around w-full  h-fit  rounded-xl p-6 flex-col
                    sm:w-[60vw] sm:h-[45vh] 
                    md:w-[50vw] 
                    lg:h-[40vh] lg:justify-center lg:w-[30vw] 
                     `}
    >
      <div className=" w-full  font-gugi flex items-center justify-center text-2xl text-gray-700 sm:text-3xl">
        <h1>Login</h1>
      </div>
      {isError && (
        <ErrorMsg
          className={`error  rounded-lg w-full bg-red-600 flex items-center justify-center text-white`}
          message={message}
          statusCode={status}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center   justify-around w-full h-full
                        sm:flex-col sm:items-center sm:justify-around 
                        md:flex-col md:h-64
                        lg:flex-col lg:justify-around  lg:items-center  lg:h-full lg:w-full   "
      >
        <div className=" h-[40vh]  w-full flex items-start justify-around flex-col  ">
          <div className=" h-[20vh]  flex flex-col justify-around items-center sm:w-full">
            <div className="sm:w-full ">
              <label htmlFor="username" className=" p-1  px-2 rounded-xl">
                Username
              </label>
              <input
                onChange={handleChange}
                value={userObj.username}
                className={`w-full ${
                  isDarkMode ? "bg-black border-gray-800 border-4" : "border-2"
                }  ${
                  isError && message.includes("Username")
                    ? "border-red-500"
                    : null
                }  h-10 pl-2 rounded-xl outline-none`}
                type="text"
                name="username"
                id="username1"
                placeholder="Enter username"
                required
                ref={usernameRef}
              />
            </div>

            <div className=" w-full">
              <label htmlFor="password" className=" p-1 px-2 rounded-xl">
                Password
              </label>
              <div className=" w-full flex items-center relative">
                <input
                  onChange={handleChange}
                  value={userObj.password}
                  className={`w-full ${
                    isError && message.includes("Password")
                      ? "border-red-500"
                      : null
                  } ${
                    isDarkMode
                      ? "bg-black border-gray-800 border-4"
                      : "border-2"
                  } h-10 pl-2  rounded-xl text-black outline-none`}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  minLength={8}
                  maxLength={8}
                  required
                  ref={passwordRef}
                />
                <ShowPassword
                  handleShowPassword={handleShowPassword}
                  inputref={passwordRef}
                />
              </div>
            </div>
          </div>

          <div className=" w-full flex items-center  justify-between ">
            <input
              className={`${
                isDarkMode ? "bg-blue-500" : "bg-gray-700"
              } text-white w-20 h-7  rounded-xl cursor-pointer ${
                loading && "cursor-not-allowed"
              } hover:bg-gray-700 hover:text-white transition-all
                sm:w-28 sm:h-8
                lg:w-40 lg:h-9`}
              type="submit"
              value="Login"
              disabled={loading ? true : false}
            />
            <div className="flex items-center justify-center  w-[95%] text-[0.8em] sm:text-[1em] lg:text-[1vw]">
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
