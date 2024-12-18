import React, { useEffect, useRef, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import {ShowPassword} from './index'
import { useSelector } from 'react-redux';

function ResetPassword() {
    const [password,setPassword] = useState('');
    const {handleOnchange} = useOutletContext();
    const [showPassword,setShowPassword] = useState(false)
    const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
    const passwordRef = useRef()
    useEffect(()=>{
        handleOnchange(password)
    },[password])

    const handleShowPassword = (value)=>{
        setShowPassword((prev)=>!prev)
    }
  

  return (
    <div className="w-full flex flex-col relative">
            <label htmlFor="email">New Password</label>
            <div className=' w-full flex items-center'>
            <input
              className={`h-[6vh] pl-2 border-2 rounded-xl w-full ${isDarkMode?'bg-black border-4 border-gray-800':'bg-white'} `}
              type={showPassword ? 'text':'password'}
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter your Password."
              required
              maxLength={8}
              ref={passwordRef}
            />
           
                <ShowPassword handleShowPassword={handleShowPassword} inputref={passwordRef}/>
            </div>
     
         
          </div>
)
}

export default ResetPassword