import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Hamburger from "../Hamburger";
import { useDispatch, useSelector } from "react-redux";
import { DarkModeButton, ColorTheme, UserJoined } from "../index";
import { activeColorTheme } from "../../Features/ColorThemeSlice";

function Header({
  logo = true,
  colorPallete = true,
  darkModeButton = true,
  classname = "",
  hamburger = "",
}) {
  const [hamBurger, setHamBurger] = useState();
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode);
  const email = useSelector((state)=>state.Login.email)
  const dispatch = useDispatch();

  useEffect(() => {
    setHamBurger(isHamburger);
  }, [isHamburger]);

  const handleColorTheme = () => {
    dispatch(activeColorTheme());
  };

  return (
    <div className={`${classname} relative flex items-center justify-center`}>
      {/* Logo */}
      <div className="logo w-52 flex items-center justify-center  ">
        {logo && <Logo classname={`w-24 rounded-lg sm:w-44 lg:w-32`} />}
      </div>
      {/* <div className=" w-fit h-5 " >
        <p  className={isDarkMode?'text-white ':'text-black  '}>{email}</p>
      </div> */}

      {/* Hamburger Button */}

      {hamburger && (
        <Hamburger
          classname={`${
            hamBurger ? "text-white " : "text-black"
          } ${isDarkMode ? 'text-white':'text-black'}  
           text-xl mr-4 z-20 absolute right-4 top-[3.5vh]
                sm:text-4xl
                lg:hidden`}
        />
      )}

  
        {/* Hamburger  menu  */}
        <div
          className={`navMenu absolute h-screen w-64 bg-gray-800 top-0   ${
            hamBurger ? "right-0" : "right-[-100%]"
          }
        sm:w-[50vw]
     
      ${isDarkMode ? 'lg:bg-black': 'lg:bg-white '} lg:h-[10vh]
      lg:right-0
         `}
        >
          {/* Hamburger Heder Menu - Dark mode button and Color Pallette Button. */}
          <div className="NavMenuHeader  h-[10%] flex items-center justify-around w-[75%] 
                         lg:h-full lg:w-full lg:justify-end ">
            <button
              className="colorThemeButton cursor-pointer  "
              onClick={handleColorTheme}
            >
              <img src="./color-wheel.png" className="w-8 sm:w-14 lg:w-8" alt="" />
            </button>
            <DarkModeButton />
          </div>

          {/* Hamburger Menu NavList  */}
          <div className="NavMenuList  text-white h-screen w-full relative flex flex-col justify-start items-center  lg:hidden">
            <ColorTheme />
            <UserJoined classname={` h-[70vh] lg:hidden    ${isDarkMode?'border-gray-900':'border-gray-300'} rounded-2xl p-4 flex items-start justify-center w-[90%]`}/>
          </div>
        </div>
      </div>

  );
}

export default Header;
