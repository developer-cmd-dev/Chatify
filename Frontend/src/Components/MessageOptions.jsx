import React, { useEffect } from "react";
import { ListBoxWrapper } from "./index";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { BsFillReplyFill } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { RiDeleteBin2Fill } from "react-icons/ri";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function MessageOptions() {
  const listBoxArr = [
    {
      key: "reply",
      name: "reply",
      icon: <BsFillReplyFill className="text-xl" />,
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
      <DropdownMenuTrigger className="bg-transparent">
        <BsThreeDots className="text-xl text-white" />
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
  );
}

export default MessageOptions;
