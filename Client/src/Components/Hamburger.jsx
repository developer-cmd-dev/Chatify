import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

import { isHamBurger } from '../Features/HamburgerSlice';
import { useDispatch } from 'react-redux';


function Hamburger({
  classname=''
}) {
  const dispatch = useDispatch()
  const handleHamburger = ()=>{
    dispatch(isHamBurger())
  }

  return (
    <div className={` w-full flex items-end justify-end`}>
      <button className='border-none' onClick={handleHamburger}>
      <GiHamburgerMenu className={`${classname}`}/>
      </button>
    </div>
  )
}

export default Hamburger