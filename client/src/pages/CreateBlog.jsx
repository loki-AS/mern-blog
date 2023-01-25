import React from 'react'
import BlogFields from '../components/BlogFields'
import Register from "./Register"
import { useNavigate } from "react-router-dom"
import { useEffect } from 'react'
import { useContext } from 'react'
import { myUserContext } from '../context/UserContext'

const CreateBlog = () => {

  const navigate = useNavigate()

  const { user } = useContext(myUserContext)

  return (
    <div>
      {user && (
        <BlogFields user={user} />
      )}
    </div>
  )
}

export default CreateBlog