import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch} from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signInsuccess } from "../../redux/user/userSlice";
// import { current } from "@reduxjs/toolkit";







const Login = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const navigate = useNavigate()
  // const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const submithandle= async (e)=>{
    e.preventDefault();

    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signin`,{
         
         email:email,
         password:password,
        
      })
      if(!email || !password){
        return toast.error("All fields are required")
      }
      
      if(res.data.success===true){
        toast.success(res.data.message)
        dispatch(signInsuccess(res))
        navigate('/')
        
      }else{
        toast.error(res.data.message)
      }

      // console.log(res)
    }
    catch(err){
      console.log(err)
      toast.error(err.response.data.message)
    }
    // console.log(firstName,lastName,email,password,confirmpassword,address)
  }
  
  return (
    <div className="gradient-bg h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign In</h2>
        <form onSubmit={submithandle}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your Password"
             value={password}
             onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full"
          >
            Sign In
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to='/register' className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
