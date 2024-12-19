import React, { useEffect, useState } from "react";
import {useDispatch, useSelector} from 'react-redux'
import {handleDarkMode} from '../Features/DarkModeSlice'
function DarkModeButton() {
  // const [isDarkMode, setIsDarkMode] = useState(false);
  const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
  const [darkMode,setDarkMode]=useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{   
    dispatch(handleDarkMode(darkMode))
  },[darkMode])
  

 

  return (
    <button
      onClick={()=> setDarkMode((prev)=>!prev)}
      className={`relative transition-all w-10 h-5 mr-5 ${isDarkMode?'bg-darkButton':'bg-lightButton'} bg-center bg-no-repeat bg-cover rounded-full flex items-center  z-20  sm:w-14 sm:h-6  lg:m-8 lg:h-6 lg:w-14  `}
    >
      <span className={`absolute transition-all mr-1 ml-1 w-3 h-3 ${isDarkMode?'bg-white right-0':'bg-black left-0'}  rounded-full sm:w-4 sm:h-4 lg:h-4 lg:w-4 `  }></span>
    </button>
  );
}

export default DarkModeButton;
