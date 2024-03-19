import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { MdDelete } from "react-icons/md";
import { Prices } from '../Components/Prices';
import { Radio } from 'antd';



const Menu = () => {
    const [allfood,setAllfood]=useState([])
    const [radio,setRadio]=useState([])
    const getallproduct = async(req,res)=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/food/getallfood`)
            
            if(data?.success){
              setAllfood(data.food)
            }
            console.log(data)
            // console.log(allfood)
            // console.log(allfood)
            // console.log(data.food)
        }
        catch(err){
          console.log(err)
          // toast.
        }
      }

      
      useEffect(()=>{
        if(!radio.length) getallproduct()
       //eslint-disable-nextline
      },[radio.length])


      // get filter product

      const filterProduct = async ()=>{
        try{
          const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/food/food-filter`,{radio})

          // console.log(data)
          setAllfood(data?.products)
        }
        catch(err){
      console.log(err)
        }
      }
        
           
      useEffect(()=>{
        if(radio.length) filterProduct()
        //eslint-disable-nextline
       },[radio])
 
  return (
    <div className=' flex justify-center min-h-screen'>
      <div className=' border-red-600 w-1/6  flex text-center flex-col shadow-md'>
        <div className='sticky top-14 z-50 mt-10'>

       <h1>Filter According To Your Choice</h1>
       <div className=' flex flex-col ml-4 items-center w-full mt-14'>
        <h1 className=' mb-7 text-2xl text-green-500'>Filter by Price</h1>
        <Radio.Group onChange={(e)=>setRadio(e.target.value)}>
        {
          Prices?.map((price)=>(
            <div key={price._id}>

              <Radio value={price.array} className=' space-y-3'>{price.name}</Radio>
            </div>
          ))
        }
         </Radio.Group>
        </div>
         

       </div>
      </div>
      <div className=' border-red-600 w-5/6 '>
        {/* {JSON.stringify(radio,null,4)} */}
      <div className='grid grid-cols-3 gap-4  ml-7 mt-7 mb-5'>
       
       {
        allfood?.map((food,index)=>(

          <div className="bg-white rounded-lg shadow-md w-80 max-w-80 max-h-96 p-4 flex flex-col" key={index} >
            <img
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
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm" >
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

export default Menu
