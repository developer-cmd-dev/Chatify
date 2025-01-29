import React, { useEffect, useState, useRef } from "react";
import { Badge, Avatar } from "@nextui-org/react";
import { MessageOptions } from ".";

function ChatArea({ messageData }) {
  const divRef = useRef(null);
  const [optionIndex,setOptionIndex] = useState(null);
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
      className={` chat  max-h-full    bottom-0 w-full overflow-y-auto flex flex-col items-start   absolute`}
    >
      {msgData.map((item, index) => (
        <div
          key={index}
          onMouseEnter={() => {
            setOptionIndex(index)
            }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) {
              console.log(e.relatedTarget)
              setOptionIndex(null);
            }
          }}
          className={` w-full   h-fit flex items-center relative   ${
            item.type === "your-message"
              ? "justify-end  "
              : "justify-end flex-row-reverse"
          } `}
        >
            
         
          {optionIndex == index && (
            <div className=" flex items-center justify-center m-4">
            <MessageOptions />

            </div>
          )}

          <div className=" py-5 ">
            <Avatar size="md" radius="full" src={""} isBordered={false} />
          </div>

          <div
            className={` min-w-[15%]  m-2 h-fit break-words whitespace-normal  p-3 max-w-[45%] bg-[#211845] rounded-xl text-white ${
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
