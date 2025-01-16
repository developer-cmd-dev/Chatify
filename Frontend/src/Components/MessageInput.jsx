import { IoAdd } from "react-icons/io5";
import { BiSolidSend } from "react-icons/bi";
import { useState } from "react";

function MessageInput({ classname, colorThemeCode, getMessage }) {
  const [message, setMessage] = useState("");


  const handleSumbit = (e) => {
    e.preventDefault()
    getMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSumbit} className="messageInput w-full h-[8%]  bg-[#171031] rounded-2xl flex items-center justify-around ">
      <div className="w-[6%] bg-[#251B4C] h-[70%] rounded-xl flex items-center justify-center">
        <IoAdd className="text-white text-xl" />
      </div>
      <div className=" w-[75%] h-full">
        <input
        onChange={(e)=>setMessage(e.target.value)}
          value={message}
          type="text"
          className="w-full bg-transparent h-full outline-none text-white"
          placeholder="Type a message ..."
        />
      </div>
      <div className="w-[10%] h-full  flex items-center justify-center">
        <button className="w-[90%] h-[60%]  rounded-xl bg-[#DBFB7F] flex items-center justify-around">
          <BiSolidSend className="text-xl" />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
