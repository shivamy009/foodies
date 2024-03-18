import React from 'react'
import { Link } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='bg-gray-100'>
       {/* <!-- Sidebar --> */}
   <div className="flex h-screen bg-gray-200">
  <div className="w-64 bg-white shadow-md">
    {/* Logo */}
    <div className="p-4">
      <h1 className="text-xl font-semibold text-gray-800">My Store</h1>
    </div>
    {/* Sidebar Links */}
    <nav className="mt-6">
      <Link to='/dashboard/admin' className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Dashboard</Link>
      <Link to='/dashboard/admin/create-shop' className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Shop</Link>
      {/* <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Category</Link> */}
      <Link to='/dashboard/admin/get-food' className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Food</Link>
      <Link to='/dashboard/admin/create-food' className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Create Food</Link>
      <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Orders</Link>
      {/* Add more links as needed */}
    </nav>
  </div>
 
  
</div>

    </div>
  )
}

export default Adminmenu
