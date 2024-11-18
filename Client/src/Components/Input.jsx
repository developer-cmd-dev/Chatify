import React from 'react'

function Input({
  label,
  type="text",
  name,
  value,
  onchange,
  placeholder,
  error,
  required=false,
  classname='',
  labelClassname,
  bgcolor,
  
  ...rest
}) {
  
  return (
    <div className=' w-full'>
    {
     label && <label className={`${labelClassname}`} htmlFor={name}>{label}</label>
    }
    <input
     type={type}
     placeholder={placeholder}
     name={name}
     id={name}
     value={value}
     onChange={(e)=>{
      onchange(e.target.value)
     }}
     className={`${classname}`}
     required={required}
     {...rest}
     style={{background:bgcolor}}
     />
     {error && <span className=''>{error}</span>}
    </div>
  )
}

export default Input