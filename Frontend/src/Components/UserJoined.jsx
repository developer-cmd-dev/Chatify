import { useSelector } from "react-redux";
import {avatar, Avatar} from "@nextui-org/react";
import {Badge} from "@nextui-org/react";


function UserJoined({ classname, colortheme, activeUsers }) {
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
          {activeUsers.map((users) => {
           return(
            <Badge color="success" content="" placement="bottom-right" shape="circle">
            <Avatar size="lg" name={users.fullname} radius="full" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
          </Badge>
           )
          })}
        </div>
      </div>
    </div>
  );
}

export default UserJoined;
