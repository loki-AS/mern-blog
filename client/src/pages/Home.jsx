import React, { useContext } from 'react'
import { useState } from 'react'
import { loader } from "../assets"
import axios from "axios";
import { useEffect } from 'react';
import BlogCard from '../components/BlogCard';
import { useNavigate } from 'react-router-dom';
import { myUserContext } from '../context/UserContext';

const Home = () => {

  const [blogData, setBlogData] = useState([])
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  const { searchResult, setSearchResult } = useContext(myUserContext)

  console.log(searchResult)


  const fetchBlog = async () => {
    
    try {

      setLoading(true)

      const { data } = await axios.get("http://localhost:3001/api/blog")

      setBlogData(data)

      setLoading(false)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchBlog()
  }, [])

  const handleNavigate = (blog) => {
    navigate(`/blog/${blog._id}`, { state: blog })
  }


  return (
    <div>

      <div className='flex justify-center items-center'>
      {loading && (
            <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
          )}
      </div>

      <div className="flex flex-wrap my-[20px] gap-[26px]">
      {searchResult.map((blog) => (
        <BlogCard 
        key={blog._id}
        {...blog}
        handleClick={() => handleNavigate(blog)}
        />
      ))}
      </div>

      <div className="flex flex-wrap my-[20px] gap-[26px]">
      {blogData.map((blog) => (
        <BlogCard 
        key={blog._id}
        {...blog}
        handleClick={() => handleNavigate(blog)}
        />
      ))}
      </div>
    </div>
  )
}

export default Home