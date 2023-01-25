import React, { useState } from 'react'
import Login from "../components/Login"
import SignUp from "../components/SignUp"

const Register = () => {

  const [login, setLogin] = useState(false)

  const loginShow = login ? 'border-b-2 border-[#4acd8d] text-white' : 'text-gray-500';

  const SignInShow = !login ? 'border-b-2 border-[#4acd8d] text-white' : 'text-gray-500';

  return (
    <div className='flex flex-col py-6 justify-center items-center'>
      
      <div className='flex py-6 font-epilogue text-xl'>

      <h1 
      className={`cursor-pointer mx-3 ${loginShow}`} 
      onClick={() => setLogin(true)}
      >
      Login
      </h1>

      <h1 
      className={`cursor-pointer mx-3 ${SignInShow}`} 
      onClick={() => setLogin(false)}
      >
      Sign Up
      </h1>

      </div>

      <div className='flex flex-col items-start p-6 rounded-md bg-[#1b1b23]'>
        {login ? 
        (<>
        <Login />
        </>) : (
        <>
        <SignUp />
        </>)}
        </div>

    </div>
  )
}

export default Register