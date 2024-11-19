import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function UserJoined({ classname, colortheme }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  const [totalUser, setTotalUser] = useState([]);



  return (
    <div className={`${classname} flex flex-col justify-around item-center`}>

        {/* {totalUser.length > 0
          ? totalUser.map((users,index) => (
            <div key={index}
            style={{
              background: isDarkMode
                ? "rgb(15 23 42 / var(--tw-bg-opacity))"
                : colortheme,
            }}
            className={`users text-white w-[100%] lg:w-full h-[6vh] bg-black  lg:h-[10vh] lg:bg- rounded-xl flex items-center justify-around   `}
          >
              <div  className=" w-full lg:w-[85%] flex items-center justify-around ">
                <div className="w-4 h-4 bg-green-600 rounded-full "></div>
                <p className="text-sm lg:text-xl">{users}</p>
              </div>
              </div>
            ))
          : null} */}
      </div>
   
  );
}

export default UserJoined;
