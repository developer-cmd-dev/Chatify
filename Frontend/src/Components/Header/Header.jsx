import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { DarkModeButton, HamburgerCom } from "../index";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { disconnectSocket } from "../../utils/SocketConnection";
import { ProfileDropdown } from "../index";
import { Spiral as Hamburger } from 'hamburger-react'

function Header({ logo = true, classname = "" }) {
  const [hamBurger, setHamBurger] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const userData = useSelector((state) => state.UserData);
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHamBurger(isHamburger);
  }, [isHamburger]);

  useEffect(() => {
    location.pathname == "/global-chat-room"
      ? setShowHamburger(true)
      : setShowHamburger(false);
  }, [location]);

  const auth = async () => {
    try {
      const res = await disconnectSocket(
        location.pathname,
        "patch",
        userData._id
      );
      console.log(res);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

 

  return (
    <>
      <div className={`${classname}  flex items-center justify-center `}>
        <div className="leftNav   logo w-[50%] flex items-center justify-start  pl-5  ">
          {logo && <Logo classname={`w-24 rounded-lg sm:w-32 lg:w-32`} />}
        </div>

        <div className="hamburgerButton w-full   flex items-center justify-end sm:hidden">
          {showHamburger && (
            <div className=" z-10">
              <Hamburger toggled={hamBurger} color='white' size={20} toggle={setHamBurger} />
            </div>
          )}
        </div>

        <div
          className={`rightNav ${hamBurger?'block':'hidden'}  w-full sm:w-[40%] md:w-[40%] lg:w-[80%]   ${
            !showHamburger
              ? "absolute top-0 right-0 items-start justify-end lg:relative lg:w-[50%] bg-transparent backdrop-blur-md	"
              : " flex items-center justify-end"
          }  h-full   lg:bg-transparent `}
        >
          {!showHamburger ? (
            <div className=" flex items-center justify-around h-full w-fit ">
              <div className="profileDropdown flex item-center justify-center h-full w-fit ">
                {location.pathname !== "/" && <ProfileDropdown />}
              </div>
              <div className="darkmodebutton flex item-center justify-center h-full w-fit  ">
                <DarkModeButton />
              </div>
            </div>
          ) :null}
        </div>
      </div>


    </>
  );
}

export default Header;
