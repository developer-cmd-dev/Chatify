import React from "react";
import { GoHome } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdFolderOpen } from "react-icons/io";
import { IoCodeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";



function Home() {
const socialMediaApi = [
    {
        app:'instagram',
        username:'devmandal',
        icons:'/Logo/instagram_2504918.png',
        unreadMsg:40
    },
    {
        app:'linkedin',
        username:'dev_mandal',
        icons:'./Logo/linkedin_2504923.png',
        unreadMsg:2
    },
    {
        app:'whatsapp',
        username:'+91 9434958990',
        icons:'./Logo/whatsapp_2504957.png',
        unreadMsg:100
    },
    {
        app:'X',
        username:'dev_mandal',
        icons:'./Logo/twitter_5968830.png',
        unreadMsg:48
    },
    {
        app:'Discord',
        username:'dev_mandal',
        icons:'./Logo/discord_5968756.png',
        unreadMsg:67
    },
]



  return (
    <div className={`body lg:bg-[#040019] h-screen p-4  md:bg-red-600`}>
      <div
        className={`main_container  w-full h-full flex justify-around items-center`}
      >
        {/* Menu Container */}
        <div className="menu h-full  w-18">
          <div className=" text-white h-[70%] flex flex-col items-center  ">
            {/* Menu-1 */}
            <div className="menu-1 flex flex-col justify-around items-center  h-[38%] text-[1.6em]">
              <GoHome />
              <IoMdNotificationsOutline />
              <IoMdFolderOpen />
            </div>

            <div className="m-4 flex items-center justify-center w-full">
              <span className="border border-gray-800 h-fit w-[60%]"></span>
            </div>

            <div className=" w-full h-[62%] flex flex-col items-center text-[1.5em]">
              <IoCodeOutline />
            </div>
          </div>

          {/* Menu - 2 */}
          <div className=" text-white h-[30%] w-full flex flex-col items-center">
            <div className="flex flex-col justify-around items-center h-[80%] text-[1.6em]">
              <IoSettingsOutline />
              <AiOutlineExclamationCircle />
            </div>
            <div className="m-4 flex items-center justify-center w-full">
              <span className="border border-gray-800 h-fit w-[60%]"></span>
            </div>
            <div className=" w-full h-[60%]  flex flex-col items-center justify-center text-[1.5em]">
              <RxExit />
            </div>
          </div>
        </div>

        {/* Message category Container */}
        <div className="messageCategory text-white bg-[#110D24]   rounded-[30px] h-full w-72 p-4">

          <div className=" h-[18%] flex flex-col items-center justify-around">
            {/* Heading */}
            <div className="heading w-full  ">
              <h1>Message category</h1>
              <p className="opacity-30 text-sm">devkmandal.dev@gmail.com</p>
            </div>

            {/* Search User Input */}
            <div className=" w-full  flex items-center justify-center h-12 rounded-xl  bg-[#1B1338]">
              <label htmlFor="search" className=" px-3 flex items-center justify-center">
                <CiSearch className="text-[1.5em]" />
              </label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search Messages.."
                className="border-none bg-transparent p-2 w-[80%] outline-none "
              />
            </div>
          </div>

          <div className="h-[40%] flex flex-col items-center justify-around ">
            {socialMediaApi.map((item)=>(
              <div key={item.app} className="w-full h-12 rounded-xl flex items-center justify-around bg-[#1B1338]">
                <div className="logo flex items-center justify-center  w-[20%]">
                  <img width='30px' src={item.icons} alt="" className="rounded-full" />
                </div>
                <div className="w-[55%] overflow-hidden   h-full flex flex-col items-start justify-center">
                  <h1>{item.username}</h1>
                  <p className="opacity-20 text-sm">{item.app}</p>
                </div>
                <div className="w-[20%]  h-full flex items-center justify-center  ">
                  <div className="w-[90%] flex items-center justify-center h-[60%] rounded-lg bg-[#9E7EFC]">
                    <p className=" text-sm">{item.unreadMsg}</p>
                  </div>
                </div>
              </div>
              
            ))}
          </div>
          
          <div className="my-4 flex items-center justify-center w-full   ">
              <span className="border border-gray-800 h-fit w-[80%]"></span>
            </div>

        </div>

        

        {/* FriendList Container */}
        <div className="ChatContainer bg-[#110D24] rounded-[30px] h-full w-[750px]"></div>
        <div className="ShowProfileContainer bg-[#110D24] rounded-[30px]  h-full w-[300px]"></div>
      </div>
    </div>
  );
}

export default Home;
