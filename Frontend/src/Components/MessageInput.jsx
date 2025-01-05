import React, { useEffect, useState } from "react";
import { Input, MediaPicker } from "./index";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { BsFileEarmarkMusicFill } from "react-icons/bs";

function MessageInput({ classname, colorThemeCode, messageData }) {
  const [message, setMessage] = useState("");
  const [isMediaPicker, setIsMediaPicker] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const fileTypesForImage = ["image", "png", "jpeg", "svg"];
  const fileTypesForVideo = ["video", "mp4"];
  const fileTypesForDocs = ["application", "pdf", "text", ""];
  const fileTypesForAudio = ["audio", "mp3"];

  const handleSumbit = () => {
    messageData(message,mediaData);
    setMessage("");
    setIsMediaPicker(false);
    setMediaData([])
  };

  const handleMediaData = (data) => {
    setMediaData(data);
    setIsMediaPicker(false);
  };

  const handleDeleteFiles = (index) => {
    mediaData.splice(index, 1);
    setMediaData([...mediaData]);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        message.length > 0 && handleSumbit();
      }}
      className="h-full w-full flex items-center justify-around relative "
    >
      {/* Selelct Media picker component */}
      {isMediaPicker && <MediaPicker handleMediaData={handleMediaData} />}
      <button
        onClick={() => setIsMediaPicker((prev) => !prev)}
        type="button"
        className={` w-10 h-10 rounded-full  bg-slate-800 flex items-center justify-center`}
      >
        <FaPlus className="text-xl" />
      </button>

      <div className="w-[65%] lg:w-[90%] relative ">
        {/* Preview media files */}
        {mediaData.length > 0 && (
          <div className="w-full border-none bottom-[50px] h-24 rounded-xl pl-4 bg-slate-800 text-white placeholder-white absolute flex items-center  overflow-x-auto">
            <div className=" w-fit flex items-center">
              {mediaData.map((files, index) => (
                <div className="relative  space-x-3 w-fit" key={index}>
                  <span
                    onClick={() => handleDeleteFiles(index)}
                    className=" absolute right-0 cursor-pointer "
                  >
                    <ImCross className="text-sm" />
                  </span>
                  {fileTypesForImage.includes(files.type) && (
                    <img
                      src={files.url}
                      alt=""
                      className="w-24 h-20 rounded-xl "
                    />
                  )}
                  {fileTypesForDocs.includes(files.type) && (
                    <div className="w-14 h-20 flex items-center justify-center">
                      <IoIosDocument className=" text-5xl" />
                    </div>
                  )}

                  {fileTypesForAudio.includes(files.type) && (
                    <div className="w-14 h-20 flex items-center justify-center">
                      <BsFileEarmarkMusicFill className=" text-5xl" />
                    </div>
                  )}

                  {fileTypesForVideo.includes(files.type) && (
                    <video className="w-24 h-20 rounded-xl "  src={files.url}></video>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <input
          type="text"
          className="w-full border-none h-10 rounded-xl pl-4 bg-slate-800 text-white placeholder-white"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Send message button */}
      <button
        disabled={message === ""}
        className=" w-10 h-10 rounded-full flex items-center  bg-slate-800 justify-center "
        type="submit"
      >
        <IoIosSend className="text-xl" />
      </button>
    </form>
  );
}

export default MessageInput;
