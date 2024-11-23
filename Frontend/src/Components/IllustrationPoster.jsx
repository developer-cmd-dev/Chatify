import React from 'react'
import { useSelector } from 'react-redux'

function IllustrationPoster({
    classname='',
}) {
  const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
  return (
    // <div className={`${classname} bg-lightIllustration bg-cover bg-center bg-no-repeat h-64 w-[90%] rounded-xl
    //                   sm:border sm:rounded-none sm:w-full`}>
    // </div>\
    <img src={isDarkMode?`./Illustration/Dark/Dark.jpg`:`./Illustration/Light/LightIllustration.jpg`} alt="" className={`${classname}  w-[90vw] rounded-xl
     sm:rounded-none sm:w-[100vw] sm:hidden
    md:hidden
    lg:w-[50vw] lg:rounded-2xl `}/>
  )
}

export default IllustrationPoster