
import React, { useEffect, useState } from 'react'
import ClassCard from './ClassCard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Classes() {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        fetch("https://summer-camp-server-sepia.vercel.app/classes")
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [])
    return (
        <div className=' container py-24'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Our Classes</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    classes.map(item => <ClassCard key={item._id} item={item}></ClassCard>)
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Classes
