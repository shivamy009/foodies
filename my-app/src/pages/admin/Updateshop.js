import axios from 'axios'
import React, { useEffect, useState }  from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'



const Updateshop = () => {
    const [name,setName]=useState("")
    const [address,setAddress]=useState("")
    const {id}=useParams();
    const {currentUser}= useSelector((state)=>state.user)
    const navigate = useNavigate();
    //get single product
    const getSingleShop = async()=>{
        try{
           const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/shop/getsingleshop/${id}`)
 
           if(data?.success){
            setName(data.shop.name)
            setAddress(data.shop.address)
           }
           console.log(data)
        }
        catch(err){
            console.log(err)
        }
    }

    // update product
    const handlesubmit =async (e)=>{
        e.preventDefault()
        try{
            const {data}= await axios.put(`${process.env.REACT_APP_API}/api/v1/shop/updateshop/${id}`,{
                name,address
            },{
                headers:{
                    'Authorization':currentUser.data.token
                }
            })

            if(data?.success){
                toast.success(data.message)
                navigate('/dashboard/admin/create-shop')
            }

        }
        catch(err){
            console.log(err)
            toast.error("Something went wrong")
        }
    }
    useEffect(()=>{
        getSingleShop()
    },[])
    
  return (
    <div className='flex h-screen  justify-center items-center flex-col bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%'>
      <div className=" flex flex-col gap-16">
        <h1 className=' text-4xl'>Here You Can Update Your Shop</h1>
     <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
  <h2 className="text-2xl font-semibold mb-4 text-center">Shop Update Form</h2>
  <form onSubmit={handlesubmit}>
    <div className="mb-4">
      <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
      <input type="text"  value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
    </div>
    <div className="mb-4">
      <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
      <input type="text"  value={address} onChange={(e)=>setAddress(e.target.value)} className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500" />
    </div>
    
    <div className=' flex gap-5 justify-center'>
    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Update Product</button>
    <button type="submit" onClick={()=> navigate('/dashboard/admin/create-shop')} className=" bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400">Cancel</button>
 
    </div>
  </form>
</div>

</div>

  
    </div>
  )
}

export default Updateshop
