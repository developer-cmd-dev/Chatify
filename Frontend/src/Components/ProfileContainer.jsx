import React from 'react'
import { Separator } from "@/components/ui/separator";
import { IoIosArrowForward } from "react-icons/io";

function ProfileContainer() {
  return (
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
  )
}

export default ProfileContainer