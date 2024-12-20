import React from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

import { isHamBurger } from '../Features/HamburgerSlice';
import { useDispatch } from 'react-redux';


function Hamburger({
  classname='',
  handleHamburger
}) {
 

  return (
    <div className={` w-full z-20 cursor-pointer flex items-end justify-end`}>
      <button className='border-none' onClick={()=>handleHamburger()}>
      <GiHamburgerMenu className={`${classname}`}/>
      </button>
    </div>
  )
}

export default Hamburger