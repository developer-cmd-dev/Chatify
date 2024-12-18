import React from "react";
import { useSelector } from "react-redux";
import { useTypewriter } from "react-simple-typewriter";
function HeroSection() {
    const isDarkMode = useSelector((state)=>state.DarkMode.isDarkMode)
      const [text] = useTypewriter({
        words: ["CHATIFY", "Stay Connected!", "With People."],
        loop: {},
        typeSpeed: 100,
        deleteSpeed: 30,
        onLoopDone: () => {
          console.log("Loop is completed");
        },
      });
    
  return (
    <div
      className={` h-fit hidden lg:flex   w-full  flex-col items-start justify-center ${
        isDarkMode ? "text-gray-200" : "text-black"
      }
                   
                   md:w-[40vw]  `}
    >
      <div className=" h-14 sm:h-20 lg:h-28 ">
        <h1
          className="font-gugi text-[2rem]  transition-all
                  sm:text-[3rem]
                  md:text-[4.5vw]
                  lg:text-[4.5vw] "
        >
          {text}
        </h1>
      </div>

      <p
        className="text-[0.9rem]
                md:text-[0.9rem]
                lg:text-[1rem]"
      >
        Welcome to Chatify! Stay connected with your friends, family, and teams
        effortlessly with our real-time chat app. Enjoy seamless conversations
        with instant messaging, group chats, and a user-friendly interface.
        Built for speed and reliability, Chatify keeps you in sync, no matter
        where you are. Dive into meaningful interactions today!
      </p>
    </div>
  );
}

export default HeroSection;
