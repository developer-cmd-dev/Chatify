import { useSelector } from "react-redux";
import { Avatar} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";



function UserJoined({ classname,  activeUsers }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);

  

  return (
    <div
      className={`${classname} hidden lg:flex  items-center justify-center ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      <div
        className={`h-[90%] w-[60%] p-4 text-white text-3xl ${
          isDarkMode ? "bg-gray-900" : "bg-gray-300"
        } rounded-xl shadow-lg flex items-start justify-center`}
      >
        <div className="flex flex-col items-center justify-around h-fit w-full ">
          {activeUsers.map((user) => {
           return(
            <Badge key={user._id} color="success" content="" placement="bottom-right" shape="circle">
            <Avatar className={`bg-slate-800 text-white`} size="lg" name={user.fullname} radius="full" src={`${user.avatar.length <= 0 ?'':user.avatar}`} />
          </Badge>
           )
          })}
        </div>
      </div>
    </div>
  );
}

export default UserJoined;
