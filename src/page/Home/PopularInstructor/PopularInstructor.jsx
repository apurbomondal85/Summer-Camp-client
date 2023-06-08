
import React, { useEffect, useState } from 'react'
import Instructor from './Instructor';

function PopularInstructor() {
    const [instructor, setInstructor] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/instructors")
            .then(res => res.json())
            .then(data => {
                const PopularInstructor = data.sort((a, b) => b.instructor.totalStudents - a.instructor.totalStudents).slice(0, 6);
                setInstructor(PopularInstructor)
            })
    }, [])
    return (
        <div className='container py-16'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Popular Instructors</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    instructor.map(item => <Instructor key={item._id} item={item}></Instructor>)
                }
            </div>
        </div>
    )
}

export default PopularInstructor
