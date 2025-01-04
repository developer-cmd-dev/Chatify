import { FaCamera } from "react-icons/fa";

function MediaPicker() {
  return (
    <div className="absolute bg-slate-900 h-56 w-64 rounded-3xl rounded-bl-none left-10 bottom-20  md:left-20 md:w-72 lg:left-10 flex flex-col items-center justify-center">
      <div className="elements w-full h-full grid grid-cols-3 grid-rows-2 place-items-center">
  <div className="forImage ">
  <label htmlFor="image" className=" w-20 h-20 rounded-full text-white bg-slate-950 flex items-center justify-center "><FaCamera className="text-2xl"/></label>
  <input className="hidden" multiple type="file" name="image" accept="*/image" id="image" />
  </div>
      </div>
      
    </div>
  );
}

export default MediaPicker;
