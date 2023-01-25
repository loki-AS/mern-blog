import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import CreateBlog from "./pages/CreateBlog"
import Register from "./pages/Register"
import BlogDetails from './pages/BlogDetails'

const App = () => {
  return (
    <div className='px-6 lg:px-16 text-white'>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create" element={<CreateBlog />} />
      <Route path="/blog/:id" element={<BlogDetails />}  />
    </Routes>
    </div>
  )
}

export default App