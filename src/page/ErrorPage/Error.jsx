
import React from 'react'
import { motion } from 'framer-motion';
import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Error() {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <div>
                <motion.img
                    src="https://img.freepik.com/free-vector/page-found-concept-illustration_114360-1869.jpg"
                    alt="error image"
                    initial={{ x: -500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                />
                <Link to="/"><Button gradientDuoTone="purpleToBlue" className='mt-4'>Back</Button></Link>
            </div>
        </div>
    )
}

export default Error
