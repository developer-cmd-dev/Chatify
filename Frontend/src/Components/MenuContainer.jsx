import React from "react";
import { GoHome } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdFolderOpen } from "react-icons/io";
import { IoCodeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RxExit } from "react-icons/rx";


function MenuContainer (){

return(
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
)

}

export default MenuContainer