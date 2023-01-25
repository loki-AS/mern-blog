import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { myUserContext } from "../context/UserContext"
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { Search } from "../assets"

const Navbar = () => {

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const { user, search, setSearch, handleSearch } = useContext(myUserContext)

    const handleCreate = () => {
        navigate("/create")
    }

    const handleLogin = () => {
        navigate("/register")
    }

    const upArrow = !open ? "hidden" : "flex";
    const downArrow = open ? "hidden" : "flex";

    const handleLogOut = () => {
        localStorage.removeItem("userInfo");
        navigate("/")
        window.location.reload(true)
    }
 
  return (
    <div>
    <div className='flex justify-between items-center'>
        <h1 className='text-white font-epilogue py-6 text-xl font-bold cursor-pointer uppercase tracking-[1px]' onClick={() => navigate("/")}>Blog</h1>

        <div className='justify-center items-center lg:flex hidden'>
            <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-full">
                <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
                <div onClick={handleSearch} className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
                    <img src={Search} alt="search" className="w-[15px] h-[15px] object-contain"/>
                </div>
            </div>
        </div>

        <div className='text-white font-epilogue flex'>
           {user &&  <button onClick={handleCreate} className='mx-5 text-lg hover:border-b-2 border-[#4acd8d] font-semibold'>Create Blog</button>}
            {user? (
                <div className='flex cursor-pointer justify-center items-center' onClick={() => setOpen(!open)}>
                <div className='pic-gradient rounded-full p-1 hover:scale-105'>
                    <img src={user?.pic} alt="profile" className='h-8 w-8 rounded-full' />
                </div>    
                <MdOutlineKeyboardArrowDown size={35} className={`mx-1 text-lg ${upArrow}`} />
                <MdOutlineKeyboardArrowUp size={35} className={`mx-1 text-lg ${downArrow}`} />
                </div>
            ): (
                <button onClick={handleLogin} className='bg-[#4acd8d] font-semibold px-2 py-1 text-lg rounded-md hover:bg-[#1de183] hover:scale-105'>Login</button>
            )}
        </div>
    </div>

    <div className='justify-center items-center lg:hidden flex'>
    <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input  value={search} onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Search for campaigns" className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none" />
        
        <div onClick={handleSearch} className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={Search} alt="search" className="w-[15px] h-[15px] object-contain"/>
        </div>
      </div>
    </div>

    <div className='border-b-2 border-[#3a3a43] my-3' />

    {open && (
        <div className='flex flex-col justify-start items-start absolute right-6 lg:right-16 bg-[#3a3a43] text-[#808191] rounded-md py-4 px-4 z-[100]'>
            <button className='font-medium font-epilogue cursor-pointer hover:text-white mb-3 text-xl'>Profile</button>
            <button className='font-medium font-epilogue cursor-pointer hover:text-white mb-3 text-xl'>About Us</button>
            <button onClick={handleLogOut} className='font-medium font-epilogue cursor-pointer hover:text-white mb-3 text-xl'>Sign Out</button>
        </div>
    )}
    </div>
  )
}

export default Navbar