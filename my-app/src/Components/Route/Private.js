import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios";
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';


export default function PrivateRoute(){
    const [ok,setOk]= useState(false)
    const {currentUser}= useSelector(state=>state.user)
    useEffect(()=>{
      const authcheck = async()=>{
        const res =await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/user-auth`,{
          headers:{
            'Authorization':currentUser.data.token
          }
        })
  
        if(res.data.ok){
          setOk(true)
        }else{
          setOk(false)
        }
      }
      authcheck();
    })

    return ok ? <Outlet/> : <Spinner/>

}



// const Private = () => {
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default Private