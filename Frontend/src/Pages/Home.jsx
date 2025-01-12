import { MenuContainer,MessageCategory,ChatMainContainer,ProfileContainer, } from "../Components";
import { Outlet,Routes,Route } from "react-router-dom";
import LeftDashBoard from "../Components/LeftDashBoard";
import MiddleDashBoard from "../Components/MiddleDashBoard";

function Home() {
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
