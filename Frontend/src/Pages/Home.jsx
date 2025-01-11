import { Separator } from "@/components/ui/separator";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoAdd } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import { IoIosArrowForward } from "react-icons/io";
import { Badge, Avatar } from "@nextui-org/react";
import { MenuContainer,MessageCategory } from "../Components";


function Home() {

  return (
    <div
      className={`body bg-[#040019] h-screen w-full  p-4 flex items-center justify-center `}
    >
      <div
        className={`main_container  lg:w-[1530px]  h-full flex justify-around items-center`}
      >
        {/* Menu Container */}
        <MenuContainer/>

        {/* Message category Container */}
        <MessageCategory/>

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
              <img
                className="rounded-xl w-[10vw]"
                src="https://images.unsplash.com/photo-1721332155637-8b339526cf4c?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt=""
              />
            </div>

            <div className=" min-w-[40%] rounded-bl-none text-white my-2 max-w-[40%] h-fit p-3 bg-[#211845] rounded-xl">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
                ipsa deserunt aliquid debitis omnis atque rem quis mollitia,
                tempora voluptate?
              </p>
            </div>
          </div>

          <div className="messageInput w-full h-[8%]  bg-[#171031] rounded-2xl flex items-center justify-around">
            <div className="w-[6%] bg-[#251B4C] h-[70%] rounded-xl flex items-center justify-center">
              <IoAdd className="text-white text-xl" />
            </div>
            <div className=" w-[75%] h-full">
              <input
                type="text"
                className="w-full bg-transparent h-full outline-none text-white"
                placeholder="Type a message ..."
              />
            </div>
            <div className="w-[10%] h-full  flex items-center justify-center">
              <div className="w-[90%] h-[60%]  rounded-xl bg-[#DBFB7F] flex items-center justify-around">
                <BiSolidSend className="text-xl" />
              </div>
            </div>
          </div>
        </div>

        {/* Profile container */}
        <div className="ShowProfileContainer bg-[#110D24] rounded-[30px] flex flex-col justify-start items-center  h-full w-[300px] p-4">
          <div className="viewProfile w-full  h-60 flex flex-col items-center justify-around">
            <div
              className="profileAvatar  w-32 h-32 rounded-full "
              style={{
                background:
                  "url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                  backgroundPosition:'center',
                  backgroundRepeat:'no-repeat',
                  backgroundSize:'cover'
              }}
            >
            </div>
            <div className=" w-full h-28 text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl">Ann Schelifer</h1>
                <p className="opacity-20">@ann_schelifer</p>
            </div>
          </div>
          <Separator className="my-3 bg-slate-800" />
        
        <div className="sharedMedia w-full h-16 ">
            <div className=" w-full h-16 flex items-center justify-between px-3 text-white text-md">
              <h1>Shared Media</h1>
              <button className="w-10 h-9 rounded-lg bg-[#251B4C] flex items-center justify-center text-xl">
              <IoIosArrowForward />
              </button>
              </div>    
        </div>
        <Separator className="my-3 bg-slate-800" />



        </div>
      </div>
    </div>
  );
}

export default Home;
