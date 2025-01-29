import React from 'react'
import { BsFillReplyFill } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { GoFileMedia } from "react-icons/go";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
function SendMediaOption() {

     const listBoxArr = [
        {
          key: "media",
          name: "Photos Videos",
          icon: <GoFileMedia  className="text-xl" />,
        },
        {
          key: "copy",
          name: "Copy text",
          icon: <IoCopyOutline className="text-xl" />,
        },
        {
          key: "edit",
          name: "Edit text",
          icon: <MdEdit className="text-xl" />,
        },
        {
          key: "delete message",
          name: "Delete Message",
          icon: <RiDeleteBin2Fill className="text-xl text-red-600" />,
        },
      ];
    
      return (
        <DropdownMenu>
          <DropdownMenuTrigger className=" w-[6%]  bg-[#251B4C] h-[70%] rounded-xl flex items-center justify-center">
          <IoAdd className="text-white text-xl" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className={`bg-[#211845] border-none text-white `}>
            {listBoxArr.map((item) => (
              <DropdownMenuItem className={`m-1`} key={item.type}>
                {item.icon}
                <p>{item.name}</p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )
}

export default SendMediaOption