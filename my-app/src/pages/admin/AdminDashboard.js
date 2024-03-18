import React from 'react'
import Adminmenu from '../../Components/Adminmenu'
import { useSelector } from 'react-redux'

const AdminDashboard = () => {
  const {currentUser} = useSelector((state)=>state.user)
  return (
     <div className=' flex'>
      <div>
      <Adminmenu/>

      </div>
      <div className=' flex-1 p-8'>
        <div>

        </div>
      <h2 className=" flex flex-col text-2xl font-semibold mb-4 justify-center items-center">Welcome to the Admin Panel</h2>
      <h1 className='flex flex-col text-2xl font-semibold mb-4 justify-center items-center'>{currentUser.data.user.firstName}</h1>
      </div>
        
     </div>
    
  )
}

export default AdminDashboard
