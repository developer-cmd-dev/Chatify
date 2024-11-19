import React from 'react'

function Logo({
  classname
}) {
  return (
    <div className=' h-[10vh]  flex items-center'>
      <img src="./Logo/logo.png" className={`${classname} `}  alt="" />
    </div>
  )
}

export default Logo