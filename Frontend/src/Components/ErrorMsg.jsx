import React from 'react'

function ErrorMsg({message,statusCode}) {
  return (
    <div className="">
          <h1>{message} : {statusCode}</h1>
      </div>
  )
}

export default ErrorMsg