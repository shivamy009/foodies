import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'




const Updatefood = () => {
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [photo,setPhoto]=useState("")
    const [veg,setVeg]=useState("")
    const [shop,setShop]=useState("")
    const {id}=useParams()
    const navigate = useNavigate()
    const {currentUser}= useSelector((state)=>state.user)
    const getsinglefood = async ()=>{
        try{
             const {data}=await axios.get(`${process.env.REACT_APP_API}/api/v1/food/getsinglefood/${id}`)
             if(data.success){
                setName(data.food.name)
                setDescription(data.food.description)
                setPrice(data.food.price)
                setVeg(data.food.vegnonveg)
                setQuantity(data.food.quantity)
                setShop(data.food.shop.name)
                setPhoto(data.food.photo)
                console.log(data)
             }

        }
        catch(err){
          console.log(err)
        }
     }

     useEffect(()=>{
        getsinglefood()
     },[])

     const updateFood=  async(e)=>{
        e.preventDefault()
        try{
         
            const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/food/updatefood/${id}`,{
               name,description,price,quantity,vegnonveg:veg
            },{
                headers:{
                    'Authorization':currentUser.data.token
                }
            })
            if(data?.success){
                console.log(data)
                toast.success(data?.message)
                navigate('/dashboard/admin/get-food')
            }
        }
        catch(err){
             console.log(err)
             toast.error("Something went wrong")
        }
     }
  return (
    <div className='min-h-screen'>
     <div className="bg-white rounded-lg shadow-md p-4" >
        <form  onSubmit={updateFood}> 
   
  <div className="grid grid-cols-2 gap-4">
    {/* Column 1 */}
    <div>
      <label htmlFor="product-name" className="block mb-2 text-sm font-medium text-gray-900">Food Name</label>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base " />
    </div>
    {/* Column 2 */}
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Description</label>
      <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "/>
    </div>
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Price</label>
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "/>
    </div>
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Quantity</label>
      <input type="number" onChange={(e)=>setQuantity(e.target.value)} value={quantity} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "/>
    </div>
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">VegNonveg</label>
      <select className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" value={veg} onChange={(e)=>setVeg(e.target.value)}>
      <option value="Veg">Veg</option>
      <option value="NonVeg">NonVeg</option>
</select>
    </div>
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Shop Name</label>
      <input type="text" value={shop} onChange={(e)=>setShop(e.target.value)} className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "/>
    </div>
    <div>
      <label htmlFor="product-quantity" className="block mb-2 text-sm font-medium text-gray-900 ">Photo</label>
      <input type="text" id="product-quantity" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base "/>
    </div>
    <div>
      <img src={photo} className=" max-w-64 max-h-44"  alt="product_photo" />
    </div>
   
  </div>
  <div className=' flex justify-center space-x-10'>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4" type="submit">Add Product</button>
    <button className=" bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg mt-4" onClick={()=>navigate('/dashboard/admin/get-food')}>  Cancel</button>
  </div>
  </form>
</div>

    </div>
  )
}

export default Updatefood
