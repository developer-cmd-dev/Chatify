import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
function PrivateRoute({children}) {
  const isAuthenticate = useSelector((state)=>state.Authenticate.authenticate)
  
  return (
  isAuthenticate?children:<Navigate to={'/'}/>
  )
}

export default PrivateRoute