import { FaCamera } from "react-icons/fa";
import { IoIosDocument } from "react-icons/io";
import { LuAudioLines } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { useEffect, useState } from "react";
import { useCompressFiles } from "../Hooks/useCompressFiles";
import { cloudinaryUpload } from "../service/cloudinary";
import { handleError } from "../utils/toastify";

function MediaPicker({ handleMediaData, handleFileCount }) {
  const inputArr = [
    {
      icon: <FaCamera className="text-2xl" />,
      htmlFor: "image",
      name: "image",
      accept: "image/*,video/*",
      id: "image",
      type: "file",
    },
    {
      icon: <IoIosDocument className="text-2xl" />,
      htmlFor: "document",
      name: "document",
      accept:
        "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdfimage",
      id: "document",
      type: "file",
    },
    {
      icon: <LuAudioLines className="text-2xl" />,
      htmlFor: "audio",
      name: "audio",
      accept: "audio/mp3",
      id: "audio",
      type: "file",
    },
    {
      icon: <FaLocationDot className="text-2xl" />,
      htmlFor: "location",
      name: "location",
      accept: "application/vnd.geo+json",
      id: "audio",
      type: "file",
    },
    {
      icon: <IoIosContact className="text-2xl" />,
      htmlFor: "contact",
      name: "contact",
      accept: ".vcf",
      id: "audio",
      type: "file",
    },
  ];


  const handleMediaPicker = async (e) => {
  try {
      const files = e.target.files;
      handleFileCount(files.length)
      const compressedFiles = await useCompressFiles(files);
      // const uploadedFiles = await cloudinaryUpload(compressedFiles);
      // handleMediaData(uploadedFiles); 
  } catch (error) {
    console.log(error.response)
    return handleError('Something went wrong.');
  }
   };



  return (
    <div className=" z-10 absolute bg-slate-900 h-56 w-64 rounded-3xl rounded-bl-none left-10 bottom-20  md:left-20 md:w-72 lg:left-10 flex flex-col items-center justify-center">
      <div className="elements w-full h-full grid grid-cols-3 grid-rows-2 place-items-center">
        {inputArr.map((elements, index) => (
          <div className={`${elements.name}`} key={index}>
            <label
              htmlFor={elements.htmlFor}
              className=" w-20 h-20 rounded-full text-white bg-slate-950 flex items-center justify-center "
            >
              {elements.icon}
            </label>
            <input
              onChange={handleMediaPicker}
              className="hidden"
              multiple
              type={elements.type}
              name={elements.name}
              accept={elements.accept}
              id={elements.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default MediaPicker;
