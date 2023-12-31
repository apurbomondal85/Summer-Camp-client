
import React, { useEffect, useState } from 'react'

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        fetch('https://summer-camp-server-sepia.vercel.app/blogs')
            .then(res => res.json())
            .then(data => {
                setBlogs(data)
            })
    }, [])

    return (
        <div className='container py-16'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Official Blog Update</h1>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {
                    blogs.map(item =>

                        <div key={item.id} className="bg-white rounded-lg">
                                <img className="rounded-t-lg w-full h-[250px]" src={item?.imageUrl} alt="" />
                            <div className=" py-5 text-center">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.title}</h5>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.excerpt}</p>
                                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item?.date}</p>

                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Blogs
