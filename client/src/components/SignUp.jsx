import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUp = () => {

  const navigate = useNavigate()

  const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
  const [pic, setPic] = useState();
  const [picLoading, setPicLoading] = useState(false);

  const submitHandler = async(e) => {
    e.preventDefault()

    setPicLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      }
      const { data } = await axios.post("http://localhost:3001/api/user", {
        name,
        email,
        password,
        pic,
      }, config)
      console.log(data);
      alert("registration successful")
      localStorage.setItem('userInfo', JSON.stringify(data))
      setPicLoading(false)
      navigate("/")
    } catch (error) {
      console.log(error)
      setPicLoading(false)
    }
  }

  const postDetails = (pics) => {
    setPicLoading(true)

    if(pics.type === "image/jpeg" || pics.type === "image/png"){
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "image-app");
      data.append("cloud_name", "dzntbbfug");
      fetch("https://api.cloudinary.com/v1_1/dzntbbfug/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setPicLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setPicLoading(false);
        });
    } else{
      alert("please select an Image")
      return
    }
  }

  return (
    <form onSubmit={submitHandler} className='flex flex-wrap flex-col gap-[5px]'>

    <label className='font-medium font-epilogue text-[14px] leading-[22px] text-[#808191] mb-[10px]'>Name</label>

    <input 
    type="text"
    placeholder='enter your name'
    className="py-[15px] sm:px-[25px] px-[15px] 
    outline-none border-[1px] border-[#3a3a43] 
    bg-transparent font-epilogue text-white text-[14px]
     placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
    required
    onChange={(e) => setName(e.target.value)}
    step="0.1"
    />

    <label className='font-medium font-epilogue text-[14px] leading-[22px] text-[#808191] my-[10px]'>Email</label>

    <input 
    type="text"
    placeholder='enter your email'
    className="py-[15px] sm:px-[25px] px-[15px] 
    outline-none border-[1px] border-[#3a3a43] 
    bg-transparent font-epilogue text-white text-[14px]
     placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
    required
    onChange={(e) => setEmail(e.target.value)}
    step="0.1"
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
    onChange={(e) => setPassword(e.target.value)}
    step="0.1"
    />

    <label className='font-medium font-epilogue text-[14px] leading-[22px] text-[#808191] my-[10px]'>Picture</label>

<input 
onChange={(e) => postDetails(e.target.files[0])}
type="file"
className="block w-full text-sm font-epilogue text-[14px] leading-[22px] text-[#808191] file:mr-4 file:py-2 file:px-2 file:rounded-full file:bg-[#1dc071] file:text-white file:border-0 file:text-sm file:font-medium" 
/>

    <button 
    type="submit"
    className={`font-epilogue hover:bg-[#1de183] font-semibold text-[16px] leading-[26px] text-white min-h-[52px] my-[10px] px-4 rounded-[10px] bg-[#1dc071]`}
    >Sign Up</button>
  </form>
  )
}

export default SignUp