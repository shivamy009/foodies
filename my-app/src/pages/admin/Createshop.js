import React, { useEffect, useState } from 'react'
import Adminmenu from '../../Components/Adminmenu'
import axios from 'axios';
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';



const Createshop = () => {
   const [categories,setCategories]= useState([])
   const[name,setName]=useState("")
   const[address,setAddress]=useState("")
   const navigate = useNavigate();

   const {currentUser}= useSelector((state)=>state.user)

   
   // create categorie
   const handleSubmit = async (e)=>{
    e.preventDefault();
    try{
         const {data}= await axios.post(`${process.env.REACT_APP_API}/api/v1/shop/createshop`,{
        name:name,
        address:address
         },{
         headers:{
          'Authorization':currentUser.data.token
         }
         })

         if(data?.success){
          getAllshop();
          toast.success(data.message)
          setName("")
          setAddress("")
         }
    }
    catch(err){
      console.log(err)
      toast.error("Somryhing went wrong")
    }
   }

   // get all shop
   const getAllshop = async()=>{
    try{
      const {data}= await axios.get(`${process.env.REACT_APP_API}/api/v1/shop/getallshop`)

      
 
     if(data?.success){
       setCategories(data.shop)
        
     }
    }
    catch(err){
      console.log(err)
      toast.error("Somrthing went wrong")
    }

     
   }
   
   // delete categories

   const deleteshop = async(id)=>{
    try{
      const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/shop/deleteshop/${id}`,{
        headers:{
          'Authorization':currentUser.data.token
        }
      })
        // console.log(data)
      // console.log(id)
      if(data?.success){
        toast.success(data.message)
        getAllshop();
      }
    }
    catch(err){
      console.log(err)
      toast.error("Something went wrong")
    }
   }
 
useEffect( ()=>{
getAllshop()
 
 
},[])
  
  return (
    <div className=' flex'>
    <div>
    <Adminmenu/>

    </div>
    <div className=' flex-1 p-8'>
    <h2 className=" flex flex-col text-2xl font-semibold mb-4 justify-center items-center">Welcome to the shop Panel</h2>
    <form onSubmit={handleSubmit}> 
    <div className=' flex justify-center m-6 gap-6 border-blue-950   p-7'>
      <label htmlFor="" className=' text-2xl'>Shop name :</label>
       <input type="text" value={name} placeholder='Enter your shop name' onChange={(e)=>setName(e.target.value)} className=' border p-1'  />
      <label htmlFor="" className=' text-2xl'>Address :</label>
       <input type="text" value={address} placeholder='Entry your address' onChange={(e)=>setAddress(e.target.value)} className=' border p-1 ' />
       <button type='submit' className='bg-blue-500 p-1 px-2 rounded-sm mr-5 hover:bg-blue-600'>Create Shop</button>
    </div>
    </form>
    <div>
    <div className="overflow-x-auto">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-200">
        <tr>
          <th className="px-4 py-2 uppercase">Shop Name</th>
          <th className="px-4 py-2 uppercase">Address</th>
          <th className="px-4 py-2 uppercase">Handle</th>
        </tr>
      </thead>
      <tbody>
        {
          categories.map((shop,index)=>(
        <tr className='' key={index}>
          <td className="border px-4 py-2 text-center" >{ shop?.name}</td>
          <td className="border px-4 py-2 text-center " >{shop?.address}</td>
          <td className="border px-4 py-2 flex justify-center gap-10"> 
          <p><button onClick={()=>navigate(`/dashboard/admin/update-shop/${shop._id}`)} className=' bg-blue-500 p-1 px-2 rounded-sm mr-5 hover:bg-blue-600'>Update</button></p>
          <button className=' ml-5' onClick={()=>deleteshop(shop._id)}>{<MdDelete className=' size-8 fill-red-700 hover:cursor-pointer hover:bg-yellow-50'/>}</button>
          </td>
        </tr>

          ))
        }
        {/* <!-- Add more rows as needed --> */}
      </tbody>
    </table>
  </div>
    </div>
    </div>
      
   </div>
  
  )
}

export default Createshop
