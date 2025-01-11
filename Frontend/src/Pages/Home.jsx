import { MenuContainer,MessageCategory,ChatMainContainer,ProfileContainer } from "../Components";
import { Outlet } from "react-router-dom";

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
          <Outlet/>          

      </div>
    </div>
  );
}

export default Home;
