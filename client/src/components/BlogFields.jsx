import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useNavigate } from "react-router-dom"

const BlogFields = ({ user }) => {

  const [ title, setTitle ] = useState("")
  const [ subtitle, setSubTitle ] = useState("") 
  const [ blog, setBlog ] = useState("")
  const [ category, setCategory ] = useState("")
  const [ picture, setPicture ] = useState()
  const [ picLoading, setPicLoading ] = useState(false)

  const navigate = useNavigate()

  const users = user._id
 
  const handleSubmit = async(e) => {
    e.preventDefault()
    
    setPicLoading(true)

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      console.log(config)
      const { data } = await axios.post("http://localhost:3001/api/blog",{
        title,
        subtitle,
        blog,
        picture,
        category,
        users,
      }, config)

      alert("Blog created")

      console.log(data)
      setPicLoading(false)
      window.location.href = "/"
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
          setPicture(data.url.toString());
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

  useEffect(() => {
    try {
      if (user?.name === undefined){
        navigate("/create")
      }
    } catch (error) {
      console.log(error)
      window.location.href = "/create"
    }
  }, [])

  return (
    <div className="bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4">
      <div className="flex justify-center items-center p-[16px] sm:min-w-[380px] bg-[#3a3a43] rounded-[10px]">
        <h1 className="font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white">Create a Blog</h1>
      </div>

      <form onSubmit={handleSubmit} className="w-full mt-[65px] flex flex-col gap-[30px]">
        <div className="flex flex-wrap gap-[40px]">
          <div className='flex flex-col w-full'>
          <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Title *</label>
          <input 
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          step="0.1"
          placeholder="book"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
          </div>
        <div className='flex flex-col w-full'>
        <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Subtitle *</label>
          <input 
          required
          value={subtitle}
          onChange={(e) => setSubTitle(e.target.value)}
          step="0.1"
          placeholder="book"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
        </div>
        </div>

        <div className='flex flex-col w-full'>
        <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Blog *</label>
        <textarea 
          required
          value={blog}
          onChange={(e) => setBlog(e.target.value)}
          rows={10}
          placeholder="story"
          className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]"
        />
        </div>

        <div className='flex flex-col w-full'>
        <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">Category *</label>
        <select id="small" value={category} onChange={(e) => setCategory(e.target.value)} className="py-[15px] sm:px-[25px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-gray-500 text-[14px] placeholder:text-[#4b5264] rounded-[10px] sm:min-w-[300px]">
          <option value="education">Education</option>
          <option value="music">Music</option>
          <option value="dance">Dance</option>
          <option value="coding">Coding</option>
          <option value="animation">Animation</option>
          <option value="drama">Drama</option>
          <option value="others">Others</option>
        </select>
        </div>

        <div className="flex flex-wrap gap-[10px]">
        <label className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191]">Picture *</label>
        <input 
        type="file"
        required
        onChange={(e) => postDetails(e.target.files[0])}
        className="block w-full text-sm font-epilogue text-[14px] leading-[22px] text-[#808191] file:mr-4 file:py-2 file:px-2 file:rounded-md file:bg-[#1dc071] file:text-white file:border-0 file:text-sm file:font-medium" />
        </div>

          <div className="flex justify-center items-center mt-[10px]">
            <button 
            type="submit"
            className={`font-epilogue hover:bg-[#1de183] font-semibold text-[16px] w-full leading-[26px] text-white min-h-[52px] my-[10px] px-4 rounded-[10px] bg-[#1dc071]`}
            >{picLoading ? "loading" : "Create Blog" }</button>
          </div>
      </form>
    </div>
  )
}

export default BlogFields