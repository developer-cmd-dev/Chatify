import React, { useState } from 'react'

function SearchInput({handleValue}) {
    const handleSetValue = (e)=>{
        handleValue(e.target.value)
    }
  return (
    <input
    type="text"
    placeholder="@search "
    className=" bg-transparent w-[70%] text-sm h-full outline-none"
    onChange={handleSetValue}
  />
  )
}

export default SearchInput