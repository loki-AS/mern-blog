import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createContext } from 'react'

export const myUserContext = createContext()

const UserContext = ({ children }) => {

    const [user, setUser] = useState()
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState([])

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      setUser(userInfo);

    }, []);

    const handleSearch = async(e) => {
      e.preventDefault()
  
      try {
        const { data } = await axios.get(`http://localhost:3001/api/blog/search?search=${search}`)
  
        setSearchResult(data)
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <myUserContext.Provider 
    value={{user, setUser, search, setSearch, searchResult, setSearchResult, handleSearch }}
    >
        {children}
    </myUserContext.Provider>
  )
}

export default UserContext