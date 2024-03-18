import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Spinner = ({path="login"}) => {
  const [count,setcount]= useState(5)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
      const intervel= setInterval(()=>{
          setcount((prevvalue)=>--prevvalue)
      },1000)

      if(count===0){
          navigate(`/login`,{
              state:location.pathname
          })
      }
      return ()=>clearInterval(intervel);
  },[count,navigate,location,path])
   
  return (
   <div>
  <div className="flex items-center justify-center h-screen">
    <div className="relative">
      <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200" />
      <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin">
      </div>
      <div>
        <h1 className=" items-center text-3xl text-red-600">Redirecting to you {'{'}count{'}'} second </h1>
        Loading..
      </div>
    </div>
  </div>
</div>


    
  )
}

export default Spinner
