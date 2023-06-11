
import { Card } from 'flowbite-react'
import React from 'react'

function Instructor({ item }) {
    return (

        <div className="bg-white rounded-lg shadow overflow-hidden">
            <img src={item?.image} className='h-[200px] lg:h-[300px] w-full object-cover object-top' alt="" />
            <div className="p-5 text-center">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.name}</h5>
            </div>
        </div>

    )
}

export default Instructor
