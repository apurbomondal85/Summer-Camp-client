
import React, { useEffect, useState } from 'react'
import Instructor from './Instructor';

function Instructors() {
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/instructors/instructor")
            .then(res => res.json())
            .then(data => {
                setInstructor(data)
            })
    }, [])
    return (
        <div className=' container py-24'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Our Instructors</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    instructor.map(item => <Instructor key={item._id} item={item}></Instructor>)
                }
            </div>
        </div>
    )
}

export default Instructors
