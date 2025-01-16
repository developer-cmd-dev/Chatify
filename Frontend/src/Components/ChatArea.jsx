import React, { useEffect, useState, useRef } from "react";
import { Badge, Avatar } from "@nextui-org/react";
import { MessageOptions } from ".";
import { BsThreeDots } from "react-icons/bs";

function ChatArea({ messageData }) {
  const divRef = useRef(null);
  const [showOptionButton, setShowOptionButton] = useState(false);
  const [showOption, setShowOption] = useState(false);
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
          onMouseEnter={() => setShowOptionButton(true)}
          onMouseLeave={() => setShowOptionButton(false)}
          className={` w-full   h-fit flex relative   ${
            item.type === "your-message"
              ? "justify-end  "
              : "justify-end flex-row-reverse"
          } `}
        >
          {showOptionButton && (
            <button
              onClick={()=>setShowOption((prev) => !prev)}
              className=" flex items-center justify-center w-12 transition-all "
            >
              <BsThreeDots className="text-md text-white" />
            </button>
          )}
          <div className=" py-5 ">
            <Avatar size="md" radius="full" src={""} isBordered={false} />
          </div>

          <div
            className={`min-w-[15%]  m-2 h-fit break-words whitespace-normal  p-3 max-w-[45%] bg-[#211845] rounded-xl text-white ${
              item.type === "your-message"
                ? "rounded-br-none"
                : "rounded-bl-none"
            } `}
          >
            <div className="opacity-35  font-thin text-xs flex items-center  w-full">
              <p className="mr-3">{item.user}</p>
              <p>{item.time.replace(/:(\d{2})\s/, " ")}</p>
            </div>
            <p className="">{item.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ChatArea;
