import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import { useSelector } from "react-redux";
import { DarkModeButton, HamburgerCom } from "../index";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { disconnectSocket } from "../../utils/SocketConnection";
import { ProfileDropdown } from "../index";
import { Spiral as Hamburger } from "hamburger-react";

function Header({ logo = true, classname = "" }) {
  const [hamBurger, setHamBurger] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const userData = useSelector((state) => state.UserData);
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const location = useLocation();
  const navigate = useNavigate();
  const paths = ['/','/register','/email-validation']
  const isDisable= paths.includes(location.pathname)

  useEffect(() => {
    setHamBurger(isHamburger);
  }, [isHamburger]);

  // const auth = async () => {
  //   try {
  //     const res = await disconnectSocket(
  //       location.pathname,
  //       "patch",
  //       userData._id
  //     );
  //     console.log(res);
  //     navigate("/home");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <div className={`${classname}  flex items-center justify-center `}>
      {/* Left navbar */}
      <div className={`leftNavItem w-48  flex items-center justify-start  pl-5  `}>
      <img src="./Logo/logo.png" className={``}  alt="" />
      </div>

      {/* Right navbar */}
      <div className={`rightNavItem w-full  h-full flex items-center justify-end`}>

        {/* Profile Dropdown  */}
      { !isDisable &&( <div className={`ProfileDropDown  w-fit mr-8 flex items-center justify-center h-full`}>
           <ProfileDropdown/>
        </div>)}

        {/* Dark Mode Button */}
        <div className={`darkModeButton w-fit h-fit`}>
          <DarkModeButton/>
        </div>  

        {/* Hamburger Button */}
     {  !isDisable&& (<div className={`HamburgerButton md:hidden `}>
        <Hamburger toggled={hamBurger} toggle={setHamBurger} color="white" size={20} />
        </div>)}

        


      </div>
    </div>
  );
}

export default Header;
