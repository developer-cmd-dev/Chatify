import React from 'react'

function Button({
  classname,
  handleButton,
  logo=false,
  logoLink='',
  name

}) {
  return (
    <div>
   <button onClick={()=>handleButton()} className={`${classname}` } >{logo && <img src={logoLink}/>}{name}</button>
   

    </div>
  )
}

export default Button