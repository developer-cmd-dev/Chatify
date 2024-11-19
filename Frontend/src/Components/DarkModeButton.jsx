import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {handleDarkMode} from '../Features/DarkModeSlice'
function DarkModeButton() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
  const [darkMode,setDarkMode]=useState(false)
  const dispatch = useDispatch()

  useEffect(()=>{   
    dispatch(handleDarkMode(darkMode))
  },[darkMode])
  

 

  return (
    <button
      onClick={()=> setDarkMode((prev)=>!prev)}
      className={`relative transition-all w-12 h-6 ${isDarkMode?'bg-darkButton':'bg-lightButton'} bg-center bg-no-repeat bg-cover rounded-full flex items-center  z-20 sm:w-20 sm:h-10 lg:m-8 lg:h-6 lg:w-14  `}
    >
      <span className={`absolute transition-all mr-1 ml-1 w-4 h-4 ${isDarkMode?'bg-white right-0':'bg-black left-0'}  rounded-full sm:w-8 sm:h-8 lg:h-4 lg:w-4 `  }></span>
    </button>
  );
}

export default DarkModeButton;
