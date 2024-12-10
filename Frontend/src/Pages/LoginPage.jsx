import { LoginForm, RegisterForm } from "../Components/index";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import { useTypewriter } from "react-simple-typewriter";
import { connectSocket } from "../utils/SocketConnection";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Features/AuthenticateSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { setProgress, resetProgress } from "../Features/TopLoaderSlice";
import {setError} from '../Features/ErrorSlice'
import { apiRequest } from "../utils/axiosHandler";

function LoginPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const isError = useSelector((state) => state.Error);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();


  const [text] = useTypewriter({
    words: ["CHATIFY", "Stay Connected!", "With People."],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 30,
    onLoopDone: () => {
      console.log("Loop is completed");
    },
  });

  const handleLoginForm = async (data) => {
    try {
      dispatch(setProgress(10)); // Start at 10%
      const onProgress = (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (progress >= 90) {
          dispatch(setProgress(progress));
        }
      };
  
      const response = await apiRequest('/api/v1/','post',data,onProgress);
      console.log(response)
    } catch (error) {
      console.log(error.response)
    }
    setLoading(true);

    
  };

  const handleRegisterForm = async (data) => {
    try {
      dispatch(setProgress(10))
      setLoading(true)
      const onProgress = (progressEvent)=>{
        const progress = Math.round((progressEvent.loaded * 100)/progressEvent.total);
        if(progress > 90){
          dispatch(setProgress(progress))
        }
      }

      const response = await apiRequest('/api/v1/register','post',data,onProgress)
      console.log(response)
      
    } catch (error) {
      console.log(error)
    }

  };

  return (
    <div
      className={`h-[calc(100vh-10vh)]   flex flex-col-reverse  items-center justify-around px-5 ${
        isDarkMode ? "bg-black" : "bg-white"
      }
                    sm:flex sm:flex-col sm:items-center sm:justify-start
                    md:flex md:items-center md:justify-around md:flex-row
                    lg:flex lg:flex-row lg:items-center lg:justify-around`}
    >
      <div
        className=" h-[90%] flex items-center flex-col-reverse justify-around
                        sm:flex-col
                        md:w-full md:flex md:flex-row md:justify-around"
      >
        <div
          className={` h-fit  w-full flex flex-col items-start justify-center ${
            isDarkMode ? "text-gray-200" : "text-black"
          }
                         sm:h-fit
                         md:w-[40vw]  `}
        >
          <div className=" h-14 sm:h-20 lg:h-28 ">
            <h1
              className="font-gugi text-[2rem]  transition-all
                        sm:text-[3rem]
                        md:text-[4.5vw]
                        lg:text-[4.5vw] "
            >
              {text}
            </h1>
          </div>

          <p
            className="text-[0.9rem]
                      md:text-[0.9rem]
                      lg:text-[1rem]"
          >
            Welcome to Chatify! Stay connected with your friends, family, and
            teams effortlessly with our real-time chat app. Enjoy seamless
            conversations with instant messaging, group chats, and a
            user-friendly interface. Built for speed and reliability, Chatify
            keeps you in sync, no matter where you are. Dive into meaningful
            interactions today!
          </p>
        </div>
        <span
          className={` w-[90%] h-0 border-2 ${
            isDarkMode ? "border-gray-800" : "border-gray-300"
          } rounded-full
                        md:w-0 md:h-[50%] `}
        ></span>
        {location.pathname === "/" ? (
          <LoginForm
            handleLoginForm={handleLoginForm}
            loading={loading}
            
          />
        ) : location.pathname === "/register" ? (
          <RegisterForm
            handleRegisterForm={handleRegisterForm}
            loading={loading}
           
          />
        ) : null}
      </div>
    </div>
  );
}

export default LoginPage;
