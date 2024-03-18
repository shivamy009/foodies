import React, { useEffect, useState } from 'react'
import Homeimage from '.././images/homeimage.png'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { mycart } from '../redux/user/userSlice'
import toast from 'react-hot-toast'
// my-app\public\homeimage.png



const Home = () => {
  const [allfood,setAllfood]=useState([])
  const {cart} = useSelector((state)=>state.user)
  // console.log(cart)
  const navigate = useNavigate()
  const dispatch = useDispatch()
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

  const send =(e)=>{
   dispatch(mycart(e))
   toast.success("Item added success")
  }

  useEffect(()=>{
    getallproduct()
  })

  // remove to cart
  
  return (
    <div className=' min-h-screen '>
      <div className=' grid grid-cols-2 w-full justify-center mt-6 text-blue-600'>
        <div className=' border-red-300  mt-16'>
          <p className=' text-3xl text-center mt-8'>Now taking online order</p>
          <h1 className=' text-center text-6xl mt-6 font-bold'>Laziz Foods</h1>
        <p className=' flex justify-center text-center w-80 ml-10 mt-10 text-2xl text-black '>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias, commodi maiores reprehenderit ducimus inventore nobis.</p>
        <div className=' flex justify-center mt-16 gap-10'>
          <button className=' bg-blue-500 p-2 rounded-md hover:bg-blue-400 text-black'>Add To cart</button>
          <button className='bg-black p-2 rounded-md text-white'>Book a table</button>
        </div>
        </div>
        <div>
       <img src={Homeimage} alt="" />
        </div>
      </div>
      <div className=' flex w-full justify-center content-center mt-10'>
      <div className='grid grid-cols-4 gap-4 w-full ml-8'>
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm" onClick={()=>send(food)}>
                Add to cart
              </button>
            </div>
            
          </div>

        ))

      }
        </div>
      </div>
    </div>
  )
}

export default Home
