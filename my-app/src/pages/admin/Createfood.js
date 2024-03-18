import React  from "react";
// import Adminmenu from "../../Components/Adminmenu";
import { Link } from "react-router-dom";
import Card from "./Card";
// import toast from "react-hot-toast";
// import axios from "axios";


const Createfood = () => {
  
  // const [allfood,setAllfood]=useState([])
  // const getallproduct = async(req,res)=>{
  //   try{
  //       const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/food/getallfood`)
        
  //       if(data?.success){
  //         setAllfood(data.food)
  //       }
  //       // console.log(data)
  //       // console.log(allfood)
  //       // console.log(allfood)
  //       // console.log(data.food)
  //   }
  //   catch(err){
  //     console.log(err)
  //     // toast.
  //   }
  // }
  // useEffect(()=>{
  //   getallproduct()
  // },[])

  //delete food
   
  return (
    <div className=" flex  min-h-screen">
      <div className="flex   w-1/5">
        <div className="w-64 bg-white shadow-md">
          {/* <!-- Logo --> */}
          <div className="p-4">
            <h1 className="text-xl font-semibold text-gray-800">My Store</h1>
          </div>
          {/* <!-- Sidebar Links --> */}
          <nav className="mt-6">
            <Link
              to="/dashboard/admin"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-300"
            >
              Dashboard
            </Link>
            <Link
              to="/dashboard/admin/create-shop"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-300"
            >
              Shop
            </Link>
            {/* <Link href="#" className="block px-4 py-2 text-gray-600 hover:bg-gray-300">Category</Link> */}
            <Link
              to="/dashboard/admin/create-food"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-300"
            >
              Food
            </Link>
            <Link
              to="/dashboard/admin/create-food"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-300"
            >
             Create Food
            </Link>
            <Link
              href="#"
              className="block px-4 py-2 text-gray-600 hover:bg-gray-300"
            >
              Orders
            </Link>
            {/* Add more links as needed */}
          </nav>
        </div>
        {/* <!-- Main Content --> */}
      </div>
      <div className=" flex flex-wrap gap-9 w-full mt-5 ml-5 justify-center">
       
          <Card/>
        

      </div>
    </div>
  );
};

export default Createfood;
