import { LoginForm, RegisterForm ,HeroSection} from "../Components/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Features/AuthenticateSlice";
import {  useEffect, useState } from "react";
import { setProgress } from "../Features/TopLoaderSlice";
import {setError} from '../Features/ErrorSlice'
import { apiRequest } from "../utils/axiosHandler";
import {handleUserData} from '../Features/UserSlice'
import {useCookies} from 'react-cookie'
import { handleError,handleSuccess } from "../utils/toastify";

function LoginPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
    ;(async()=>{
      try {
        const res =await apiRequest('/api/v1/auto-login','post',null);
        const userData = res.data.data.user
        dispatch(isAuthenticated({authenticate:true}))
        dispatch(handleUserData({...userData}))
        navigate('/home')
        return handleSuccess(res.data.message)
        
      } catch (error) {
        if(!error.success){
          try {
            const res = await apiRequest('/api/v1/refresh-token','post',null)
            dispatch(handleUserData({...res.data.data}))
            dispatch(isAuthenticated({authenticate:true}))
            navigate('/home')
            return handleSuccess(res.data.message)
          } catch (error) {
            console.log(error.message)
            }
        }
        // return handleError(error.message)
        
      }

    })()
  },[])




  const handleLoginForm = async (data) => {
    dispatch(setError({isError:false}))
    try {
      const response = await apiRequest('/api/v1/','post',data);
      dispatch(isAuthenticated({authenticate:true}))
      const userdata = response.data.data.user;
      dispatch(handleUserData({...userdata}))
      navigate('/home')
      return handleSuccess(response.data.message);
    } catch (error) {
      return handleError(error.message)
    }


    
  };

  const handleRegisterForm = async (data) => {
    try {
    const response = await apiRequest('/api/v1/register','post',data,onProgress)

    } catch (error) {

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
        <HeroSection/>
       
        <span
          className={` w-[90%] h-0 border-2 hidden lg:block ${
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
