import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Hamburger from "../Hamburger";
import { connect, useDispatch, useSelector } from "react-redux";
import { DarkModeButton,  } from "../index";
import { activeColorTheme } from "../../Features/ColorThemeSlice";
import { useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { isAuthenticated } from "../../Features/AuthenticateSlice";
import { connectSocket, getSocket } from "../../utils/SocketConnection";
function Header({
  logo = true,
  colorPallete = true,
  darkModeButton = true,
  classname = "",
  hamburger = "",
}) {
  const [hamBurger, setHamBurger] = useState();
  const [showHamburger, setShowHamburger] = useState(false);
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const isAuthenticate = useSelector((state)=>state.Authenticate)
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setHamBurger(isHamburger);
  }, [isHamburger]);

  useEffect(() => {
    location.pathname == "/global-chat"
      ? setShowHamburger(true)
      : setShowHamburger(false);
  }, [location]);
 
  const auth = async ()=>{
    dispatch(isAuthenticated({authenticate:false,email:""}))
    const socket = await getSocket()
    if(socket){
      socket.emit('logout',isAuthenticate.email)
    }
  }

  const handleColorTheme = () => {
    dispatch(activeColorTheme());
  };



  return (
    <div className={`${classname} relative flex items-center justify-center `}>
      <div className="leftNav  logo w-[50%] flex items-center justify-start  pl-5  ">
        {logo && <Logo classname={`w-24 rounded-lg sm:w-32 lg:w-32`} />}
      </div>

      <div className="rightNav w-[50%] relative  h-full flex items-center justify-end ">
        {!showHamburger ? (
          <DarkModeButton />
        ) : (
          showHamburger && (
            <div className="broder w-full sm:w-[20vw] lg:w-[20vw] h-full   flex items-center justify-around">
              <button
                title="Logout"
                className="w-6 h-6 flex items-center justify-center  rounded-full  transition-all hover:bg-gray-300"
                onClick={()=>auth()}
              >
                <CiLogout className={`text-black text-lg`} />
              </button>
              <button
                className="colorThemeButton cursor-pointer  "
                onClick={handleColorTheme}
                title="Color Pallete"
              >
                <img
                  src="./color-wheel.png"
                  className="w-6 sm:w-8 lg:w-8"
                  alt=""
                />
              </button>
              <DarkModeButton />
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default Header;
