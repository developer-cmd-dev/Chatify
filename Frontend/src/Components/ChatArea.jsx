import React, { useEffect, useState, useRef } from "react";
import { Badge, Avatar } from "@nextui-org/react";

function ChatArea({ messageData }) {
  const divRef = useRef(null);
  const [msgData, setMsgData] = useState([]);
  useEffect(() => {
    if (divRef.current) {
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
  }, [msgData]);

  useEffect(() => {
    setMsgData(messageData);
  }, [messageData]);

  return (
    <div
      ref={divRef}
      className={` chat  max-h-full bottom-0 w-full overflow-y-auto flex flex-col items-start  absolute`}
    >
      {msgData.map((item, index) => (
        <div
          key={index}
          className={` w-full  h-fit flex   ${
            item.type === "your-message"
              ? "justify-end  "
              : "justify-end flex-row-reverse"
          } `}
        >
          <div className=" py-3 ">
          <Avatar size="md" radius="full" src={""} isBordered={false} />
          </div>
          

          <div
            className={`min-w-[15%]  m-2 h-fit break-words whitespace-normal  p-3 max-w-[45%] bg-[#211845] rounded-xl text-white ${
              item.type === "your-message"
                ? "rounded-br-none"
                : "rounded-bl-none"
            } `}
          >
            <div className="opacity-35  font-thin text-xs flex items-center justify-between w-full"><p>{item.user}</p><p>{item.time.replace(/:(\d{2})\s/, " ")}</p></div>
            <p className="" >{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatArea;
