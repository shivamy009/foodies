import React, { useEffect, useState } from 'react'
import Adminmenu from '../../Components/Adminmenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'




const CreateProduct = () => {
    const [categories,setCategories]=useState([])
    const [name,setName]=useState("")
    const [description,setDescription]=useState("")
    const [price,setPrice]=useState("")
    const [quantity,setQuantity]=useState("")
    const [photo,setPhoto]=useState("")
    const [veg,setVeg]=useState("")
    const [shop,setShop]=useState("")
    const {currentUser}= useSelector((state)=>state.user)
    const navigate = useNavigate()


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
       useEffect(()=>{
        getAllshop();
       },[])

       // handle crete product
       const handlecreate =async (e)=>{
        e.preventDefault()
        try{
            const foodData = new FormData();
            foodData.append("name", name);
          foodData.append("description", description);
          foodData.append("price", price);
          foodData.append("quantity", quantity);
          foodData.append("photo", photo);
           foodData.append("shop", shop); 
           foodData.append("vegnonveg", veg); 

            const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/food/createfood`,
                 foodData
            ,{
                headers:{
                    'Authorization':currentUser.data.token
                }
            })

            if(data?.success){
                toast.success(data.message)
                navigate('/dashboard/admin/get-food')
                // console.log(data)
            }else{
                toast.error(data.message)
            }
            
            // console.log(name,description,price,quantity,veg,shop,photo)
        }
        catch(err){
            console.log(err)
            toast.error("Something went wrong")
        }

       }
       
  return (
    <div className=' flex w-full'>
      <div>
        <Adminmenu/>
      </div>
      <div className=' text-center border-red-400 w-full'>
        <h1 className=' text-3xl text-center'>Create Your Produt Here </h1>
        
    <form className="bg-white rounded-lg shadow-md p-4" onSubmit={handlecreate}>
 
  <div className="grid grid-cols-2 gap-4">
    {/* Column 1 */}
    <div>
      <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Food Name</label>
      <input type="text" placeholder='Enter your food name' value={name} onChange={(e)=>setName(e.target.value)}   className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg  " />
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Description</label>
      <input type="text" placeholder='Enter Description' value={description} onChange={(e)=>setDescription(e.target.value)}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg  " />
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Price</label>
      <input type="number" placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg  " />
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Quantity</label>
      <input type="select" placeholder='Enter Quantity' value={quantity} onChange={(e)=>setQuantity(e.target.value)}  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg  " />
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">VegNonveg</label>
  <select className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" value={veg} onChange={(e)=>setVeg(e.target.value)}>
  <option value="Veg">Veg</option>
  <option value="NonVeg">NonVeg</option>
</select>
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Shop Name</label>
    <select className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg" value={shop} onChange={(e)=>setShop(e.target.value)}>
        {
            categories?.map((shop)=>(
                
                <option key={shop._id} value={shop._id}>{shop.name} </option>
            ))
        }
  {/* <option value="Shubham">Shubham</option> */}
</select>
    </div>
    {/* Column 2 */}
    <div>
    <label htmlFor="product-name" className="block mb-2 text-lg font-medium text-gray-900 ">Photo</label>
      <input type="file"  className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg " name="photo"
                    accept="image/*" onChange={(e)=>setPhoto(e.target.files[0])} />
    </div>
    {/* Column 2 */}

    {photo ?(
    <div>
   <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      
                      className=" max-w-64 max-h-44"
                    />
    </div>

    ) :(
    <div>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPLAWPaHq7oUTA3KIRst4BMAwCqSqOYbkGXZMUDd6fA&s" className=' max-w-52' alt="" />
    </div>

    )

    }


    
    {/* Additional Input Fields (customize as needed) */}
    {/* Example: Price, Description, SKU, etc. */}
    {/* Add more input fields here */}
    {/* Submit Button */}
  </div>
    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg mt-4" type="submit">Add Product</button>
</form>

      </div>
    </div>
  )
}

export default CreateProduct
