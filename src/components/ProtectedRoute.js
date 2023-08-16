import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {

  let token =  JSON.parse(localStorage.getItem('token'))
  if(!token){
    return <Navigate to='/login'/>
    }
  return (
    <div>
     {children}
     </div>
  )
}
export default ProtectedRoute