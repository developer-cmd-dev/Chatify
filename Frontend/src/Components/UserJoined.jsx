import { useSelector } from "react-redux";

function UserJoined({ classname, colortheme, activeUsers }) {
  const isDarkMode = useSelector((state) => state.DarkMode.isDarkMode);
  

  return (
    <div className={`${classname} hidden lg:flex  items-center justify-center ${isDarkMode?'bg-black':'bg-white'}`}>
      <div
        className={`h-[90%] w-[60%] p-4 text-white text-3xl ${isDarkMode?'bg-gray-900':'bg-gray-300'} rounded-xl shadow-lg flex items-start justify-center`}
      >
        <div className="flex flex-col items-center justify-around h-fit w-full ">
          {activeUsers.map((users) => (
            <div key={users._id}
              className={` relative h-16 w-16 rounded-full flex items-center justify-center m-2`}
              style={{
                backgroundColor: users.iconColor,
              }}
            >
              <p>{users.username[0]}</p>
              <span className="absolute h-4 w-4 bg-green-400 rounded-full right-0 bottom-1"></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserJoined;
