
import React, { useContext } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider'
import { FaDownload } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';

function AddClass() {
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        const name = user?.displayName;
        const email = user?.email;
        const className = data.className;
        const availableSeats = data.availableSeats;
        const price = data.price;
        const formData = new FormData();
        formData.append('image', data.image[0]);
        const response = await fetch(`https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_IMGBB}`, {
            method: 'POST',
            body: formData
        });
        const imgData = await response.json();
        console.log(imgData);
        if (imgData.data.display_url) {
            fetch("https://summer-camp-server-sepia.vercel.app/classes", {
                method: 'POST',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ instructor: name, email, className, availableSeats, price, image: imgData.data.display_url, status: 'pending', totalEnroll: 0, feedback: '' })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        toast.success("Class added is Success", {
                            position: "top-right",
                            autoClose: 1000
                        })
                        reset();
                    }
                })
        }
    };

    return (
        <div className='p-32'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Add Class</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-12'>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="name" id="name" defaultValue={user?.displayName} readOnly className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="Name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="email" id="email" defaultValue={user?.email} readOnly className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="className" id="className" {...register("className")} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="className" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Class Name</label>
                    </div>
                    <div>
                        <input type="file" name="image" id="image" className='hidden' {...register("image", { required: true })} />
                        <label htmlFor="image" className='flex items-center justify-center gap-2 py-2 bg-gradient-to-tr from-[#00b7b8] to-[#110edd] text-white font-bold cursor-pointer'>Upload Image <FaDownload></FaDownload></label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="availableSeats" id="availableSeats" {...register("availableSeats")} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="availableSeats" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Available Seats</label>
                    </div>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="text" name="price" id="price" {...register("price")} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                        <label htmlFor="price" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Price</label>
                    </div>
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add Class</button>
            </form>
            <ToastContainer />
        </div>
    )
}

export default AddClass
