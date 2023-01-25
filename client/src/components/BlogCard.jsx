import React from 'react'
import { tagType } from '../assets'
import formatDistance from 'date-fns/formatDistance'

const BlogCard = ({blog, createdAt, picture, subtitle, title, users, handleClick, category }) => {

   const dateStr = createdAt
   
   const str = formatDistance(
    new Date(dateStr),
    new Date()
   )

  return (
    <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={handleClick}>
    <img src={picture} alt="picture" className="w-full h-[158px] object-cover rounded-[15px]"/>

    <div className="flex flex-col p-4">

    <div className="flex flex-row items-center mb-[18px]">
          <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
          <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">{category}</p>
    </div>

    <div className="block">
          <h3 className="font-epilogue font-semibold capitalize text-[16px] text-white text-left leading-[26px] truncate py-2">{title}</h3>
    </div>

    <div>
        <h1 className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px]">{blog.length > 50 ? blog.substring(0, 50)+"..." : blog}</h1>
    </div>

    <div className='my-3 flex items-center'>
        <img src={users.pic} alt="pic" className='h-10 w-10 rounded-full' />
        <div className='mx-2'>
            <p className='capitalize font-epilogue font-semibold text-md'>{users.name}</p>
            <p className='text-sm font-epilogue text-[#808191]'>{str}</p>
        </div>
    </div>
    </div>
  </div>
  )
}

export default BlogCard