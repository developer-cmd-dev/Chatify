import React, { useCallback, useEffect, useState } from "react";
import { Input, MediaPicker } from "./index";
import { FaPlus } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import { ImCross } from "react-icons/im";
import { IoIosDocument } from "react-icons/io";
import { BsFileEarmarkMusicFill } from "react-icons/bs";
import { Skeleton } from "@/components/ui/skeleton";

function MessageInput({ classname, colorThemeCode, messageData }) {
  const [message, setMessage] = useState("");
  const [isMediaPicker, setIsMediaPicker] = useState(false);
  const [mediaData, setMediaData] = useState([]);
  const fileTypesForImage = ["image", "png", "jpeg", "svg"];
  const fileTypesForVideo = ["video", "mp4"];
  const fileTypesForDocs = ["application", "pdf", "text", ""];
  const fileTypesForAudio = ["audio", "mp3"];
  const [fileCount, setFileCount] = useState([]);

  const handleSumbit = () => {
    messageData(message, mediaData);
    setMessage("");
    setMediaData([]);
    setFileCount([])
  };

  const handleFileCount = (count) => {
    let dummySkeletonCount =[];
    for (let i = 1; i <=count; i++) {
      dummySkeletonCount.push(i)
    }
    setFileCount(dummySkeletonCount)
  };



  const handleMediaData = (data) => {
    // setIsMediaPicker(false);
    setMediaData(data);
  };

  const handleDeleteFiles = (index) => {
    mediaData.splice(index, 1);
    fileCount.splice(index,1)
    setFileCount([...fileCount])
    setMediaData([...mediaData]);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        message.length > 0 || mediaData.length > 0 ? handleSumbit() : null;
      }}
      className="h-full w-full flex items-center justify-around relative "
    >
      {/* Selelct Media picker component */}
      {isMediaPicker && (
        <MediaPicker
          handleMediaData={handleMediaData}
          handleFileCount={handleFileCount}
        />
      )}
      <button
        onClick={() => setIsMediaPicker((prev) => !prev)}
        type="button"
        className={` w-10 h-10 rounded-full  bg-slate-800 flex items-center justify-center`}
      >
        <FaPlus className="text-xl" />
      </button>

      <div className="w-[65%] lg:w-[90%] relative ">
        {/* Preview media files */}
        {mediaData.length > 0 || fileCount.length > 0 ? (
          <div className="  w-full bottom-[50px] min-h-24 max-h-96 rounded-xl pl-4 bg-slate-800 text-white placeholder-white absolute overflow-y-auto p-4 ">


            <div className="relative  w-fit  grid grid-cols-4 gap-6   ">
              {fileCount.length >0 && mediaData.length == 0 ? fileCount.map((items,index)=>(
                <div key={index} className="  justify-center ml-3 space-y-3 w-full">
                  <Skeleton className="w-48 h-40 rounded-xl bg-slate-700" />
                </div>
              )) : null}

              {mediaData.map((files, index) => (
                <div className="relative flex  h-full  w-full" key={index}>
                  <span
                    onClick={() => handleDeleteFiles(index)}
                    className=" absolute right-0 cursor-pointer "
                  >
                    <ImCross className="text-sm" />
                  </span>

                  {/* File type for image */}
                  {fileTypesForImage.includes(files.type) && (
                    <img
                      src={files.url}
                      alt=""
                      className="w-[30vw] rounded-xl "
                      sizes="200px"
                    />
                  )}

                  {/* File type for docs */}
                  {fileTypesForDocs.includes(files.type) && (
                    <div className="w-14 h-20 flex items-center justify-center">
                      <IoIosDocument className=" text-5xl" />
                    </div>
                  )}

                  {/* File type for audio */}
                  {fileTypesForAudio.includes(files.type) && (
                    <div className="w-14 h-20 flex items-center justify-center">
                      <BsFileEarmarkMusicFill className=" text-5xl" />
                    </div>
                  )}

                  {/* File type for video */}
                  {fileTypesForVideo.includes(files.type) && (
                    <video
                      className="w-24 h-20 rounded-xl "
                      src={files.url}
                    ></video>
                  )}
                </div>
              ))}
            </div>


          </div>
        ) : null}

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
