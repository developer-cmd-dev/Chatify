import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiRequest } from "../utils/axiosHandler";
import { setError } from "../Features/ErrorSlice";
import {Outlet, useNavigate} from 'react-router-dom'
function EamilValidationPage() {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [isEmailCorrect,setIsEmailCorrect] = useState(false)

  useEffect(()=>{
    navigate('/email-validation')
    setIsEmailCorrect(false)
  },[])
  
  const handleOnchange = ()=>{

  }


  const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
        const onProgress = (progressevent)=>{
            const progress = Math.round((progressevent.loaded*100)/progressevent.total);
            if(progress >=90){
                
            }
        }
        const response = await apiRequest('/api/v1/email-validation','post',{email:email},onProgress)
        console.log(response)
        setIsEmailCorrect(true)
        navigate('/email-validation/reset-password')
        dispatch({status:null,message:'',isError:false});
    } catch (error) {
        dispatch(setError({...error,isError:true}))
    }


  }



  return (
    <div
      className={`h-[90vh] w-screen flex flex-col items-center justify- ${
        isDarkMode && "bg-black text-white"
      } `}
    >
      <div className="h-[25vh] w-full flex items-center justify-center  ">
        <h1 className="font-montserrat text-[2rem] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.5rem] font-bold text-gray-900">
         {isEmailCorrect?'Reset Password':'Email Validation.'}
        </h1>
      </div>
      <div className="update-container w-[70%] sm:w-[70%] md:w-[50%] lg:w-[30%] min-h-[25vh] p-4 border-4 border-gray-400 rounded-2xl flex items-center justify-center">
        <form
        onSubmit={handleSubmit}
          action=""
          className={`w-full ${isEmailCorrect?'h-[30vh]':'h-full'}   flex items-center justify-around flex-col `}
        >
          <div className={`${isEmailCorrect && 'opacity-50 cursor-not-allowed'} w-full flex flex-col`}>
            <label htmlFor="email">Email</label>
            <input
              className={`h-[6vh] border-2 rounded-xl outline-none bg-white `}
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your email."
              disabled={isEmailCorrect ? true:false}
            />
          </div>
          <div className="w-full">
          <Outlet/>
          </div>
          <div>
            <input
              type="submit"
              id="reset-password"
              name="reset-Password"
              value={isEmailCorrect?'Reset Password':'Verify Email'}
              className={`bg-green-400 text-white p-1 rounded-md cursor-pointer `}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EamilValidationPage;
