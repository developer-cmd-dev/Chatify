import { MenuContainer,MessageCategory,ChatMainContainer,ProfileContainer } from "../Components";

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
       <ChatMainContainer/>

        {/* Profile container */}
      <ProfileContainer/>
      </div>
    </div>
  );
}

export default Home;
