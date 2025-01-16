import React, { useEffect, useState } from "react";

function ChatArea() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    for (let i = 0; i < 20; i++) {
      arr.push(i);
    }
  }, []);
  return (
    <div className="chat h-fit bottom-0 w-full  border border-red-600  absolute">
      {arr.map((item, index) => (
        <p
          key={index}
          className={`min-w-[20%] h-fit p-3 max-w-[45%] bg-[#211845] right   rounded-xl `}
        >
          {item}
        </p>
      ))}
    </div>
  );
}

export default ChatArea;
