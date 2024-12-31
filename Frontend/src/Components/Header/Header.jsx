import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Hamburger from "../Hamburger";
import { connect, useDispatch, useSelector } from "react-redux";
import { DarkModeButton } from "../index";
import { activeColorTheme } from "../../Features/ColorThemeSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { isAuthenticated } from "../../Features/AuthenticateSlice";
import {
  connectSocket,
  disconnectSocket,
  getSocket,
} from "../../utils/SocketConnection";
import LoadingBar from "react-top-loading-bar";
import { ProfileDropdown } from "../index";
import { cn } from "@nextui-org/react";
import { Icon } from "@iconify/react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuItem,
  Divider,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
function Header({
  logo = true,
  colorPallete = true,
  darkModeButton = true,
  classname = "",
  hamburger = "",
}) {
  const [hamBurger, setHamBurger] = useState(false);
  const [showHamburger, setShowHamburger] = useState(false);
  const userData = useSelector((state) => state.UserData);
  const isHamburger = useSelector((state) => state.hamBurger.value);
  const isAuthenticate = useSelector((state) => state.Authenticate);
  const progress = useSelector((state) => state.TopLoader.progress);
  const dispatch = useDispatch();
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

  const handleColorTheme = () => {
    dispatch(activeColorTheme());
  };

  const handleHamburger = () => {
    setHamBurger((prev) => !prev);
    console.log("clicked");
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = [
    "About",
    "Blog",
    "Customers",
    "Pricing",
    "Enterprise",
    "Changelog",
    "Documentation",
    "Contact Us",
  ];

  return (
    // <>
    //   <div
    //     className={`${classname}  flex items-center justify-center `}
    //   >
    //     <div className="leftNav   logo w-[50%] flex items-center justify-start  pl-5  ">
    //       {logo && <Logo classname={`w-24 rounded-lg sm:w-32 lg:w-32`} />}
    //     </div>

    //     <div className="hamburgerButton w-full z-20 ">
    //    {  showHamburger && <Hamburger handleHamburger = {handleHamburger} classname="text-white mr-4 lg:hidden"/>}
    //     </div>

    //     <div className={`rightNav   w-[60%] sm:w-[40%] md:w-[40%] lg:w-[80%]   ${showHamburger ? 'absolute top-0 right-0 items-start justify-end lg:relative lg:w-[50%] bg-slate-900':' flex items-center justify-end'}  h-full   lg:bg-transparent `}>

    //       {!showHamburger ? (
    //         <div className=" flex items-center justify-around h-full w-fit ">
    //           <div className="profileDropdown flex item-center justify-center h-full w-fit ">
    //           { location.pathname !== '/' && }

    //           </div>
    //        <div className="darkmodebutton flex item-center justify-center h-full w-fit ">
    //        <DarkModeButton/>

    //        </div>
    //         </div>
    //       ) : (
    //         showHamburger && (
    //           <div className=" w-full  h-[10vh]   flex items-center justify-around">
    //             <button
    //               title="Logout"
    //               className=" flex items-center justify-around  text-white  transition-all  absolute bottom-5 w-[80%] h-[6vh] bg-blue-500 rounded-md hover:bg-red-500 lg:relative lg:bottom-0 lg:w-10 lg:h-10 lg;lg:bg-transparent lg:rounded-full"
    //               onClick={() => auth()}
    //             >
    //               <CiLogout className={`text-white text-lg hover:text-black`} />
    //               <p className="lg:hidden">Exit chat</p>
    //             </button>
    //             <button
    //               className="colorThemeButton cursor-pointer  "
    //               onClick={handleColorTheme}
    //               title="Color Pallete"
    //             >
    //               <img
    //                 src="./color-wheel.png"
    //                 className="w-6 sm:w-8 lg:w-8"
    //                 alt=""
    //               />
    //             </button>
    //             <DarkModeButton />
    //           </div>
    //         )
    //       )}
    //     </div>
    //   </div>

    //   {/* <LoadingBar
    //     color="linear-gradient(90deg, rgba(83,19,19,1) 0%, rgba(200,18,95,1) 29%, rgba(0,212,255,1) 94%)"
    //     progress={progress}
    //     className=""
    //     height={5}

    //   /> */}
    // </>

    <Navbar
      // classNames={{
      //   wrapper: "w-full justify-center",
      //   item: "hidden md:flex ",
      // }}
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      className="dark bg-black text-white h-[10vh] flex items-center justify-around border"
    >
      {/* Left Content */}
      <NavbarBrand className="border  ">
        <div className="rounded-full bg-foreground text-background">
          {/* <AcmeIcon size={34} /> */}
        </div>
        <span className="ml-2 text-small font-medium">ACME</span>
      </NavbarBrand>

      {/* Center Content */}
      {/* <NavbarContent justify="center">
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link aria-current="page" color="foreground" href="#" size="sm">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            About Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link className="text-default-500" href="#" size="sm">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent> */}

      {/* Right Content */}
      {/* <NavbarContent className="hidden md:flex border" justify="end">
        <NavbarItem className="ml-2 !flex gap-2">
          <Button className="text-default-500" radius="full" variant="light">
            Login
          </Button>
          <Button
            className="bg-foreground font-medium text-background"
            color="secondary"
            endContent={<Icon icon="solar:alt-arrow-right-linear" />}
            radius="full"
            variant="flat"
          >
            Get Started
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarContent className="border">
      <ProfileDropdown/>

      </NavbarContent>


      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarMenu className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-default-200/50 pb-6 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50">
        <NavbarMenuItem>
          <Button fullWidth as={Link} href="/#" variant="faded">
            Sign In
          </Button>
        </NavbarMenuItem>
        <NavbarMenuItem className="mb-4">
          <Button
            fullWidth
            as={Link}
            className="bg-foreground text-background"
            href="/#"
          >
            Get Started
          </Button>
        </NavbarMenuItem>

        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link className="mb-2 w-full text-default-500" href="#" size="md">
              {item}
            </Link>
            {index < menuItems.length - 1 && <Divider className="opacity-50" />}
          </NavbarMenuItem>
        ))}

      </NavbarMenu>
    </Navbar>
  );
}

export default Header;
