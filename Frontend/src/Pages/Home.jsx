import { useEffect } from "react";
import { MenuContainer, } from "../Components";
import { Outlet } from "react-router-dom";
import {useSocket} from '../Hooks/useSocket'

function Home() {
const {socket,isConnected} = useSocket()


useEffect(()=>{
;(async()=>{
console.log(await isConnected)
})()
},[])



  return (
    <div
    className={`body bg-[#040019] h-screen w-full  p-4 flex items-center justify-center `}
  >
    <div
      className={`main_container  lg:w-[1530px]  h-full flex justify-around items-center`}
    >
      <MenuContainer/>
      <Outlet/>
    </div>
  </div>
  );
}

export default Home;
