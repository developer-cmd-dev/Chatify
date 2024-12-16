import React from 'react'

function ErrorMsg({message,statusCode,className}) {
  return (
    <div className={className}>
          <h1>{message} : {statusCode}</h1>
      </div>
  )
}

export default ErrorMsg