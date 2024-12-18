import { LoginForm, RegisterForm ,HeroSection} from "../Components/index";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Features/AuthenticateSlice";
import {  useEffect, useState } from "react";
import { setProgress } from "../Features/TopLoaderSlice";
import {setError} from '../Features/ErrorSlice'
import { apiRequest } from "../utils/axiosHandler";
import {handleUserData} from '../Features/UserSlice'

function LoginPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLoginForm = async (data) => {
    dispatch(setError({isError:false}))
    try {
      setLoading(true)
      dispatch(setProgress(10)); 
      const onProgress = (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (progress >= 90) {
          dispatch(setProgress(progress));
        }
      };
  
      const response = await apiRequest('/api/v1/','post',data,onProgress);
      dispatch(handleUserData({...response.data.data}))
      dispatch(isAuthenticated({email:'',authenticate:true}))
      navigate('/home')
      dispatch(setError({status:null,message:'',isError:false}))

       
    } catch (error) {
      dispatch(setError({...error,isError:true}))
    }
    setLoading(false)


    
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
      console.log(response.data)
      dispatch(isAuthenticated({email:'',authenticated:true}))
      navigate('/home');
      dispatch(setError({status:null,message:'',isError:false}))

      
    } catch (error) {
      dispatch(setError({...error,isError:true}))
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
