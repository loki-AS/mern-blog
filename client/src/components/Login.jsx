import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        }
      }

      const { data } = await axios.post(
        "https://mern-blog-eqoh.onrender.com/api/user/login",
        { email, password },
        config        
      )
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      window.location.href = '/'     
    } catch (error) {
      alert("error occured")
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-wrap flex-col gap-[5px]'>
      <label className='font-medium font-epilogue text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Email</label>

      <input 
      type="text"
      placeholder='enter your email'
      className="py-[15px] sm:px-[25px] px-[15px] 
      outline-none border-[1px] border-[#3a3a43] 
      bg-transparent font-epilogue text-white text-[14px]
       placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
      required
      step="0.1"
      value={email}
      onChange={e => setEmail(e.target.value)}
      />

      <label className='font-medium font-epilogue text-[14px] leading-[22px] text-[#808191] my-[10px]'>password</label>

      <input 
      type="password"
      placeholder='enter your password'
      className="py-[15px] sm:px-[25px] px-[15px] 
      outline-none border-[1px] border-[#3a3a43] 
      bg-transparent font-epilogue text-white text-[14px]
       placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
      required
      step="0.1"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      />

      <button 
      type="submit"
      className={`font-epilogue font-semibold text-[16px] leading-[26px] text-white min-h-[52px] my-[10px] px-4 rounded-[10px] bg-[#1dc071]`}
      >Login</button>
    </form>
  )
}

export default Login