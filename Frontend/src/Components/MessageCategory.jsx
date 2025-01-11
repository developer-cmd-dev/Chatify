import React from 'react'
import { CiSearch } from "react-icons/ci";
import { Badge, Avatar } from "@nextui-org/react";
import { IoMdChatbubbles } from "react-icons/io";
import { MdOutlineChatBubble } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdWifiCalling } from "react-icons/md";
import { Separator } from "@/components/ui/separator";
import { Outlet } from 'react-router-dom';


function MessageCategory() {
    const chatMode = [
        {
          mode: "Global chat",
          icons: <IoMdChatbubbles />,
          isActive: false,
        },
        {
          mode: "Private chat",
          icons: <MdOutlineChatBubble />,
    
          isActive: true,
        },
        {
          mode: "Groups",
          icons: <MdGroups2 />,
          isActive: false,
        },
        {
          mode: "Call",
          icons: <MdWifiCalling />,
          isActive: false,
        },
      ];
    
  return (
    <>
        <div className="messageCategory text-white bg-[#110D24]   rounded-[30px] h-full w-72 p-4">
          <div className=" h-[18%] flex flex-col items-center justify-around">
            {/* Heading */}
            <div className="heading w-full  ">
              <h1>Message category</h1>
              <p className="opacity-30 text-sm">devkmandal.dev@gmail.com</p>
            </div>

            {/* Search User Input */}
            <div className=" w-full  flex items-center justify-center h-12 rounded-xl  bg-[#1B1338]">
              <label
                htmlFor="search"
                className=" px-3 flex items-center justify-center"
              >
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
            {chatMode.map((item) => (
              <div
                key={item.mode}
                className={`w-full h-12 rounded-xl flex items-center justify-start  ${
                  item.isActive && "bg-[#1B1338]"
                }`}
              >
                <div className="logo flex items-center justify-center text-xl  w-[20%]">
                  {item.icons}
                </div>
                <div className="w-[55%] overflow-hidden   h-full flex flex-col items-start justify-center">
                  <h1 className=" text-md">{item.mode}</h1>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4 bg-slate-800" />

          <div className="w-full h-[37%]   ">
            <div className=" flex items-center justify-center">
              <h1>Direct messages</h1>
            </div>

            <div className=" h-[90%] overflow-y-auto scrollbar-none scroll-smooth ">
            
          
              <div className=" w-full h-fit flex items-center justify-around my-4">
                <Badge
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                  size="sm"
                >
                  <Avatar
                    size="md"
                    radius="full"
                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                  />
                </Badge>
                <div className=" w-[75%]">
                  <h1 className="opacity-20">@devkmanadal</h1>
                  <p className="text-sm">hey dev whats going on.</p>
                </div>
              </div>{" "}
            
            </div>
          </div>
        </div>
        <Outlet/>
    </>


  )
}

export default MessageCategory