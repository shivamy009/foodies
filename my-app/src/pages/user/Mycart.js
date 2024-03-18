import React, { useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { addsingleItem, removesingleItem, removetocart } from '../../redux/user/userSlice';
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { MdOutlineCurrencyRupee } from "react-icons/md";





const Mycart = () => {
  const [totalprice,setTotalprice]=useState(0)
  const {cart} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const handleremove = (e)=>{
    // console.log(e._id)
    // console.log(e)
    dispatch(removetocart(e._id))
  }

  const removeSingle = (e)=>{
    console.log(e)
    dispatch(removesingleItem(e))
  }

  const addSingle = (e)=>{
    console.log(e)
    dispatch(addsingleItem(e))
  }
  const total = ()=>{

    let totalpricing =0;
    cart.map((element)=>(
      totalpricing=element.price * element.quantity +totalpricing
    ));
    setTotalprice(totalpricing)
  }
  useEffect(()=>{
    total()
  },[total])
  return (
    <div className=' min-h-screen'>
     <div className="container mx-auto p-4">
  {/* Cart items */}
  <div className="bg-white rounded-lg shadow-md p-4 mb-4">
    <h1 className="text-2xl font-semibold mb-4">Your Cart</h1>
    {/* Single cart item */}
  {
    cart.map((element,index)=>(
    <div className="flex items-center border-b border-gray-200 py-2" key={index}>

      <img src={element.photo} alt="Product" className="w-16 h-16 rounded-md mr-4" />
      <div className="flex-grow">
        <h2 className="text-lg font-medium">{element.name}</h2>
        <p className="text-gray-600">Price: {element.price}</p>
      </div>
      <div className="flex items-center">
        
        <button className=' mr-4' onClick={()=>handleremove(element)} >{<MdDelete className=' size-8 fill-red-700 hover:cursor-pointer hover:bg-yellow-50'  />}</button>

        <div className=' flex justify-center items-center space-x-2'>
          <button onClick={()=>addSingle(element)}>{< GoPlus className=' bg-blue-300 text-2xl p-1 rounded-sm hover:bg-blue-600 transition-all duration-500'/>}</button>
        <input type="text" defaultValue={1} value={element.quantity} className="w-12 text-center border border-gray-300 rounded-md ml-4" />
          <button onClick={ element.quantity <=1 ? ()=>handleremove(element) : ()=>removeSingle(element)}>{<FiMinus className=' bg-blue-300 text-2xl p-1 rounded-sm hover:bg-blue-600 transition-all duration-500'/>}</button>
        </div>
        
      </div>
    </div>
    
  ))
}
  </div>

  
  <div className="bg-white rounded-lg shadow-md p-4">
    <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
    
    <div className="flex justify-between">
      <span>Total:</span>
      <span className=' flex justify-center items-center  space-x-1 text-green-600'>
      <span className="font-semibold"> {<MdOutlineCurrencyRupee />}</span>
      <span className="font-semibold"> {totalprice}</span>

      </span>
    </div>
    <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">
      Proceed to Checkout
    </button>
  </div>
</div>

    </div>
  )
}

export default Mycart
