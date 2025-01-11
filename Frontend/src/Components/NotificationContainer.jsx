import React from 'react'
import { IoMdNotificationsOutline } from "react-icons/io";
import { Separator } from "@/components/ui/separator";



function NotificationContainer() {
  return (
    <div className="messageCategory text-white bg-[#110D24] flex flex-col items-center justify-start   rounded-[30px] h-full w-72 p-4">
      <div className=' h-10 w-[50%] flex items-center justify-between '>
        <h1 className=' opacity-40'>Notfications</h1>
        <IoMdNotificationsOutline className='text-2xl'/>
      </div>
        <Separator className="my-4 bg-slate-800 w-[80%]" />
    
    </div>
  )
}

export default NotificationContainer