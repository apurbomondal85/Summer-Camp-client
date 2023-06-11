
import React from 'react'

function Instructor({ item }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow">
      <img src={item?.image} className='h-[200px] lg:h-[300px] w-full object-cover object-top' alt="" />
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.name}</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Email : {item?.email}</p>
      </div>
    </div>
  )
}

export default Instructor
