import React, { useState } from 'react'

function ResetPassword() {
    const [password,setPassword] = useState('')
  return (
    <div className="w-full flex flex-col">
            <label htmlFor="email">New Password</label>
            <input
              className="h-[6vh] border-2 rounded-xl "
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter your Password."
            />
          </div>
)
}

export default ResetPassword