import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { FaCartArrowDown } from "react-icons/fa";



const Header = () => {
  const {cart} = useSelector((state)=>state.user)
  const [total,setTotal]=useState(0)
  const {currentUser} = useSelector((state)=>state.user)
  console.log(currentUser)
  // console.log(cart)
  // const data =  currentUser.data;
  const handleLogout = () => {
    localStorage.clear();
    toast.success("logout success")
  };
  return (
  
   <nav className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4">
    {currentUser ? (

  <div className="container mx-auto flex items-center justify-between uppercase">
    {/* Logo */}
    
    <NavLink className="text-white font-bold text-xl ml-[70px]">Foodies</NavLink>
    {/* Navigation Links */}
    <ul className="flex space-x-4 mr-[130px]">
      <li><NavLink to='/' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>Home</NavLink></li>
      <li><NavLink to='/menu' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>Menu</NavLink></li>
      <li><NavLink to='/about' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>About</NavLink></li>
       
      <li className="relative group">
        {/* Dropdown Trigger */}
        
        <NavLink href="#" className="text-white hover:text-gray-300 group-hover:text-blue-600 transition-all duration-1000">
         {currentUser.data.user.firstName}
          {/* Dropdown Arrow */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline-block ml-1 transform -rotate-90 transition-transform duration-300 group-hover:rotate-0" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </NavLink>
        {/* Dropdown Menu */}
        <ul className="absolute hidden mt-2 space-y-2 bg-white text-gray-800 group-hover:block">
          <li><NavLink to={`/dashboard/${currentUser?.data.user?.role===1 ? 'admin' :'user'}`} className="block px-4 py-2 hover:bg-gray-200">Dashboard</NavLink></li>
          <li><NavLink to='/login' onClick={handleLogout} className="block px-4 py-2 hover:bg-gray-200">Logout</NavLink></li>
          {/* Add more dropdown items as needed */}
        </ul>
      </li>
      <li><NavLink to='/contact' className="text-white hover:text-blue-600 transition-all duration-300">Contact</NavLink></li>
      <div className=' flex justify-center items-center'>
      <li><NavLink to={`/dashboard/cart/${currentUser?.data.user?.role===0 ? 'user' :'admin'}`} className="text-white hover:text-blue-600 transition-all duration-300">cart({cart ? cart.length:total})</NavLink></li>
      <li><NavLink to='/contact' className="text-white   transition-all duration-300">{<FaCartArrowDown/>}</NavLink></li>

      </div>
       
    </ul>
  </div>
    ) :(
  <div className="container mx-auto flex items-center justify-between uppercase">
    {/* Logo */}
    
    <NavLink className="text-white font-bold text-xl ml-[70px]">Foodies</NavLink>
    {/* Navigation Links */}
    <ul className="flex space-x-4 mr-[130px]">
      <li><NavLink to='/' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>Home</NavLink></li>
      <li><NavLink to='/menu' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>Menu</NavLink></li>
      <li><NavLink to='/about' className={({isActive})=> isActive ? ' text-black-950' :'text-white hover:text-blue-600 transition-all duration-300'}>About</NavLink></li>
       
      
      <li><NavLink to='/contact' className="text-white hover:text-blue-600 transition-all duration-300">Contact</NavLink></li>
      <li><NavLink to='/login' className="text-white hover:text-blue-600 transition-all duration-300">Login</NavLink></li>
      <li><NavLink to='/register' className="text-white hover:text-blue-600 transition-all duration-300">SignUp</NavLink></li>
    </ul>
  </div>

      
    )

    }

</nav>
 
  )
}

export default Header
