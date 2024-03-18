import React from 'react'

const About = () => {
  return (
    <div className='  min-h-screen'>
    <div className=' flex  m-20 relative'>
    <img src="https://images.pexels.com/photos/616401/pexels-photo-616401.jpeg?cs=srgb&dl=pexels-lukas-616401.jpg&fm=jpg" alt="Food Delivery Team" className="mb-6 rounded-lg shadow-md w-2/5" />
    
      <div className=' flex absolute  text-4xl overflow-hidden w-2/5 justify-center mt-20  text-rose-700'>
      Flavors Of India
      
      </div>
      <div className=' flex absolute text-white text-4xl overflow-hidden w-2/5 mt-40 justify-center'>
      
      We are always here to serve you.
      </div>
      <ul className="list-disc pl-6 text-gray-700 ml-10 flex flex-col space-y-14 ">
            <li>Wide variety of cuisines from local favorites to international delights.</li>
            <li>Fast and reliable delivery with real-time tracking.</li>
            <li>Fresh ingredients sourced from trusted partners.</li>
            <li>Easy-to-use app for seamless ordering.</li>
            <li>24/7 customer support to assist you.</li>
        </ul>
    </div>

    </div>
  )
}

export default About
