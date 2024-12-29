import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Hamburger from "../Hamburger";
import { connect, useDispatch, useSelector } from "react-redux";
import { DarkModeButton } from "../index";
import { activeColorTheme } from "../../Features/ColorThemeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { isAuthenticated } from "../../Features/AuthenticateSlice";
import { connectSocket, disconnectSocket, getSocket } from "../../utils/SocketConnection";
import LoadingBar from "react-top-loading-bar";
import {ProfileDropdown} from '../index'
function Header({
  logo = true,
  colorPallete = true,
  darkModeButton = true,
  classname = "",
  hamburger = "",
}) {
  const [hamBurger, setHamBurger] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const userData = useSelector((state)=>state.UserData)
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const isAuthenticate = useSelector((state) => state.Authenticate);
  const progress = useSelector((state) => state.TopLoader.progress);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    setHamBurger(isHamburger);
  }, [isHamburger]);

  useEffect(() => {
    location.pathname == "/global-chat-room"
      ? setShowHamburger(true )
      : setShowHamburger(false);
  }, [location]);


  const auth = async () => {
      try {
        const res = await disconnectSocket(location.pathname,'patch',userData._id);
        console.log(res)
        navigate('/home')
      } catch (error) {
        console.log(error)
      }
  };

  const handleColorTheme = () => {
    dispatch(activeColorTheme());
  };

  const handleHamburger = ()=>{
    setHamBurger((prev)=>!prev)
    console.log('clicked')
  }

  return (
    <>
      <div
        className={`${classname}  flex items-center justify-center `}
      >
        <div className="leftNav   logo w-[50%] flex items-center justify-start  pl-5  ">
          {logo && <Logo classname={`w-24 rounded-lg sm:w-32 lg:w-32`} />}
        </div>

        <div className="hamburgerButton w-full z-20 ">
       {  showHamburger && <Hamburger handleHamburger = {handleHamburger} classname="text-white mr-4 lg:hidden"/>}
        </div>

        <div className={`rightNav   w-[60%] sm:w-[40%] md:w-[40%] lg:w-[80%]   ${showHamburger ? 'absolute top-0 right-0 items-start justify-end lg:relative lg:w-[50%] bg-slate-900':' flex items-center justify-end'}  h-full   lg:bg-transparent `}>
          
          {!showHamburger ? (
            <div className=" flex items-center justify-around h-full w-fit ">
              <div className="profileDropdown flex item-center justify-center h-full w-fit ">
              { location.pathname !== '/' && <ProfileDropdown/>}

              </div>
           <div className="darkmodebutton flex item-center justify-center h-full w-fit ">
           <DarkModeButton/>

           </div>
            </div>
          ) : (
            showHamburger && (
              <div className=" w-full  h-[10vh]   flex items-center justify-around">
                <button
                  title="Logout"
                  className=" flex items-center justify-around  text-white  transition-all  absolute bottom-5 w-[80%] h-[6vh] bg-blue-500 rounded-md hover:bg-red-500 lg:relative lg:bottom-0 lg:w-10 lg:h-10 lg;lg:bg-transparent lg:rounded-full"
                  onClick={() => auth()}
                >
                  <CiLogout className={`text-white text-lg hover:text-black`} />
                  <p className="lg:hidden">Exit chat</p>
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

      {/* <LoadingBar
        color="linear-gradient(90deg, rgba(83,19,19,1) 0%, rgba(200,18,95,1) 29%, rgba(0,212,255,1) 94%)"
        progress={progress}
        className=""
        height={5}
        
      /> */}
    </>
  );
}

export default Header;
