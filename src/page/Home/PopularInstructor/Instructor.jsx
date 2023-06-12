
import { Card } from 'flowbite-react'
import React from 'react'
import { motion } from 'framer-motion';

function Instructor({ item }) {
    return (
        <motion.div
            className="bg-white rounded-lg shadow overflow-hidden"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <img src={item?.image} className='h-[200px] lg:h-[300px] w-full object-cover object-top' alt="" />
            <div className="p-5 text-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.name}</h5>
            </div>
        </motion.div>

    )
}

export default Instructor
