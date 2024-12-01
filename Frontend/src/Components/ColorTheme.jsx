import React, { useState } from "react";
import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setColorCode } from "../Features/ColorThemeSlice";

function ColorTheme() {
  const colorsArr = ["#FF2D55", "#FF6C2F", "#9EFF9C", "#55AAFF", "#AF52DE"];
  const dispatch = useDispatch()
  const {isColortheme} = useSelector(
    (state) => state.colorThemeChange
  );

  const [isActive,setIsActive] = useState('')
  

  

  const handleColorCode = (colors) => {
    dispatch(setColorCode(colors))
  };

  return (
    isColortheme && (
      <div className="  transition-all w-[90%] h-10  bg-gray-700 rounded-xl flex items-center justify-around
                        sm:h-20 lg:absolute lg:z-20 lg:h-12 lg:w-[40%] lg:top-[-15px] lg:right-[140px] lg:rounded-tl-2xl lg:rounded-bl-2xl lg:rounded-br-2xl lg:rounded-tr-none ">
        {colorsArr.map((colors,index) => (
          <button
            key={colors}
            className={`w-4 h-4 rounded-full   sm:h-8 sm:w-8 lg:h-6 lg:w-6 ${index === isActive && 'border-4 border-white'}`}
            style={{
              background: `${colors}`,
            }}
            onClick={() => {
             handleColorCode(colors)
             setIsActive(index)
            }}
          ></button>
        ))}
      </div>
    )
  );
}

export default ColorTheme;
