import React from "react";
import { GoHome } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoMdFolderOpen } from "react-icons/io";
import { IoCodeOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { Badge, Avatar } from "@nextui-org/react";
import { Separator } from "@/components/ui/separator"
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";





function Home() {
  const socialMediaApi = [
    {
      app: "instagram",
      username: "devmandal",
      icons: "/Logo/instagram_2504918.png",
      unreadMsg: 40,
      isActive:false,
    },
    {
      app: "linkedin",
      username: "dev_mandal",
      icons: "./Logo/linkedin_2504923.png",
      unreadMsg: 2,
      isActive:true,
    },
    {
      app: "whatsapp",
      username: "+91 9434958990",
      icons: "./Logo/whatsapp_2504957.png",
      unreadMsg: 100,
      isActive:false,
    },
    {
      app: "X",
      username: "dev_mandal",
      icons: "./Logo/twitter_5968830.png",
      unreadMsg: 48,
      isActive:false,
    },
    {
      app: "Discord",
      username: "dev_mandal",
      icons: "./Logo/discord_5968756.png",
      unreadMsg: 67,
      isActive:false,
    },
  ];

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
            {socialMediaApi.map((item) => (
              <div
                key={item.app}
                className={`w-full h-12 rounded-xl flex items-center justify-around ${item.isActive && 'bg-[#1B1338]'}`}
              >
                <div className="logo flex items-center justify-center  w-[20%]">
                  <img
                    width="30px"
                    src={item.icons}
                    alt=""
                    className="rounded-full"
                  />
                </div>
                <div className="w-[55%] overflow-hidden   h-full flex flex-col items-start justify-center">
                  <h1>{item.username}</h1>
                  <p className="opacity-20 text-sm">{item.app}</p>
                </div>
                <div className="w-[20%]  h-full flex items-center justify-center  ">
                  <div className="w-[60%] flex items-center justify-center h-[50%] rounded-lg bg-[#9E7EFC]">
                    <p className=" text-sm">{item.unreadMsg}</p>
                  </div>
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
              </div>
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
              </div>
            </div>
          </div>
        </div>

        {/* Chat Container */}
        <div className="ChatContainer bg-[#110D24] rounded-[30px] h-full w-[750px] flex flex-col items-center justify-center p-4">
            <div className="user rounded-2xl flex items-center justify-between w-full h-20 bg-[#1B1338] ">
              <div className="h-full w-[70%]  flex items-center text-white ">
                <div className=" w-[17%] flex items-center justify-center h-full">
                <Badge
                  color="success"
                  content=""
                  placement="bottom-right"
                  shape="circle"
                  size="sm"
                >
                  <Avatar
                    size="lg"
                    radius="full"
                    src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
                    isBordered={false}
                  />
                </Badge>
                </div>
             

                <div className=" text-lg">
                  <h1>devkmandal0@gmail.com</h1>
                  <p className="opacity-20 text-sm">online</p>
                </div>
              </div>

              <div className="w-[13%] h-full  flex items-center justify-center">
                  <div className="bg-[#241A4B] w-[50%] h-[50%] rounded-xl text-white flex items-center justify-center">
                  <BsThreeDotsVertical />

                  </div>
              </div>

            </div>
            <Separator className="my-4 bg-slate-800 w-[80%]" />


            <div className="chat h-[75%] w-full ">
              <div className=" w-fit h-fit p-3 bg-[#211845] rounded-xl">
                <img className="rounded-xl w-[10vw]" src="https://images.unsplash.com/photo-1721332155637-8b339526cf4c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
              </div>

              <div className=" min-w-[40%] rounded-bl-none text-white my-2 max-w-[40%] h-fit p-3 bg-[#211845] rounded-xl">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ipsa deserunt aliquid debitis omnis atque rem quis mollitia, tempora voluptate?</p>
              </div>
            </div>

            <div className="messageInput w-full h-[8%]  bg-[#171031] rounded-2xl flex items-center justify-around">
            <div className="w-[6%] bg-[#251B4C] h-[70%] rounded-xl flex items-center justify-center">
            <IoAdd className="text-white text-xl" />
            </div>
            <div className=" w-[75%] h-full">
            <input type="text" className="w-full bg-transparent h-full outline-none text-white" placeholder="Type a message ..." />
            </div>
            <div className="w-[10%] h-full  flex items-center justify-center">
              <div className="w-[90%] h-[60%]  rounded-xl bg-[#DBFB7F] flex items-center justify-around">
              <BiSolidSend className="text-xl" />
              </div>
            </div>

            </div>


        </div>
        <div className="ShowProfileContainer bg-[#110D24] rounded-[30px]  h-full w-[300px]"></div>
      </div>
    </div>
  );
}

export default Home;
