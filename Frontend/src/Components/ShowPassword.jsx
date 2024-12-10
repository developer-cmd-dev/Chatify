import React, { useState } from 'react'
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";

function ShowPassword({
    handleShowPassword, 
    inputref
}) {
    const [showConfirmPassword,setShowConfirmPassword] = useState(false)
  return (
    <button
    className="absolute right-4 text-lg "
    type='button'
    onClick={()=>{
        handleShowPassword(inputref.current.name)
        setShowConfirmPassword((prev)=>!prev)
    }}
  >
    {!showConfirmPassword ? <IoEye /> : <IoMdEyeOff />}
  </button>
  )
}

export default ShowPassword