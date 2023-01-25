import { formatDistance } from 'date-fns'
import React, { useState } from 'react'
import { useLocation } from "react-router-dom"
import { tagType } from '../assets'

const BlogDetails = () => {

  const { state } = useLocation()

  console.log(state.createdAt)
  const [isLoading, setIsLoading] = useState(false);

  const dateStr = state.createdAt
   
  const str = formatDistance(
   new Date(dateStr),
   new Date()
  )

  return (
    <div className='my-6'>
      
      {isLoading && <Loader />}

      <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <img src={state.picture} alt="blogpicture" className="w-full h-[410px] object-cover rounded-xl"/>
      </div>

      <div className="mt-[60px] flex flex-col gap-5">
        <div className="flex-[2] flex flex-col gap-[40px]">
          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Creator</h4>

            <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
              <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                <img src={state.users.pic} alt="user" className="w-[80%] h-[80%] object-contain rounded-full"/>
              </div>
              <div>
                <h4 className="font-epilogue font-semibold text-[14px] text-white break-all capitalize">{state.users.name}</h4>
                <div className='flex'>
                  <h1 className='font-epilogue'>Created <span className='text-[#808191]'>{str} ago</span></h1>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Title</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.title}</p>
              </div>
          </div>

          <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Subtitle</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.subtitle}</p>
              </div>
          </div>

        </div>

        <div>
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">Blog</h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">{state.blog}</p>
              </div>
          </div>

      </div>
    </div>
  )
}

export default BlogDetails