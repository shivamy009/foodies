import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import { useParams } from 'react-router-dom';

const Card = () => {
  // const {id}=useParams();
  const {currentUser}= useSelector((state)=>state.user)
  const navigate = useNavigate()

  const [allfood,setAllfood]=useState([])
  const getallproduct = async(req,res)=>{
    try{
        const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/food/getallfood`)
        
        if(data?.success){
          setAllfood(data.food)
        }
        // console.log(data)
        // console.log(allfood)
        // console.log(allfood)
        // console.log(data.food)
    }
    catch(err){
      console.log(err)
      // toast.
    }
  }
 
  
  const deleteFood = async(id)=>{
    try{
      const {data}= await axios.delete(`${process.env.REACT_APP_API}/api/v1/food/deletefood/${id}`,{
        headers:{
          'Authorization':currentUser.data.token
        }
      })
        // console.log(data)
      // console.log(id)
      if(data?.success){
        toast.success(data.message)
        getallproduct()
        
      }
    }
    catch(err){
      console.log(err)
      toast.error("Something went wrong")
    }
   }

   

   useEffect(()=>{
    getallproduct()
  },[])

  return (
    <div className='grid grid-cols-3 gap-4 w-full'>
      {
        allfood.map((food,index)=>(
          <div className="bg-white rounded-lg shadow-md w-80 max-w-80 max-h-96 p-4 flex flex-col" key={index}>
            <img
              // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1oDEoNYOxpMMfXEuaLhWYSfW-s6GJSd7GwJOsWEhsg&s"
              src={food.photo}
              alt="Product"
              className=" h-40 rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
               {food.name}
            </h3>
            <p className="text-gray-600 text-sm mb-2 text-wrap overflow-clip">
               {food.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-semibold">price: {food.price}</span>
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm" onClick={()=>navigate(`/dashboard/admin/update-food/${food._id}`)}>
                Update
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-green-600 font-semibold">Quantity :{food.quantity}</span>
              <button className=' mt-3' onClick={()=>deleteFood(food._id)}>{<MdDelete className=' size-8 fill-red-700 hover:bg-yellow-50  hover:cursor-pointer'/>}</button>
            </div>
          </div>

        ))

      }
        </div>
  )
}

export default Card
