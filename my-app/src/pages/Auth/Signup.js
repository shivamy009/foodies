import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";


const Signup = () => {
  const [firstName,setFirstName]= useState('')
  const [lastName,setLastName]= useState('')
  const [email,setEmail]= useState('')
  const [password,setPassword]= useState('')
  const [address,setAddress]= useState('')
  const [confirmpassword,setconfirmPassword]= useState('')
  const navigate = useNavigate();

  const submithandle= async (e)=>{
    e.preventDefault();

    try{
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/signup`,{
         firstName:firstName,
         lastName:lastName,
         email:email,
         password:password,
         address:address
      })
      if(!firstName || !lastName || !email || !password){
        return toast.error("All fields are required")
      }
      if(password !==confirmpassword){
        return toast.error("Password is not matched with confirm password")
      }

      if(res.data.success===true){
        toast.success(res.data.message)
        navigate('/login')
        
      }else{
        toast.error(res.data.message)
      }

      console.log(res)
    }
    catch(err){
      console.log(err)
      toast.error("Something went wrong")
    }
    // console.log(firstName,lastName,email,password,confirmpassword,address)
  }
  
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Sign Up</h2>
        <form onSubmit={submithandle}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
              FirstName
            </label>
            <input
              type="text"
            autoComplete="on"
              value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium">
             LastName
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
             autoComplete="on"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Enter your Name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Email
            </label>
            <input
              type="email"
             value={email}
             onChange={(e)=>setEmail(e.target.value)}
            autoComplete="on"
              placeholder="Enter your Email"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">
              Address
            </label>
            <input
              type="text"
             value={address}
             onChange={(e)=>setAddress(e.target.value)}
             
             autoComplete="on"
              placeholder="Enter your Address"
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
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              autoComplete="on"
              placeholder="Enter your Password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium"
            >
             Confirm Password
            </label>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e)=>setconfirmPassword(e.target.value)}
             autoComplete="on"
              placeholder="Enter confirm password"
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <Link to='/login' className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
