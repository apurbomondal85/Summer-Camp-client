
import { Button } from 'flowbite-react'
import { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import img from '../../assets/images/login.jpg'

function Register() {
    const [show, setShow] = useState(false)


    return (
        <div className='container flex flex-col lg:flex-row justify-center items-center gap-8 mt-24'>
            <form className='basis-[50%]'>
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" id="name" name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@gmail.com" required />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type={show ? "text" : "password"} id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {
                        !show ? <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(true)}><FaEyeSlash></FaEyeSlash></span>
                            :
                            <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(false)}><FaEye></FaEye></span>
                    }
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type={show ? "text" : "password"} id="password" name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {
                        !show ? <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(true)}><FaEyeSlash></FaEyeSlash></span>
                            :
                            <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(false)}><FaEye></FaEye></span>
                    }
                </div>
                <div className="mb-6">
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                    <input type="url" id="photo" name='photo' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo Url" required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                >
                    Register
                </Button>
                <p className="mt-4">Already have an account? please <Link className="text-blue-700 underline" to="/login">Login</Link></p>
                <div className="flex justify-center mt-6 py-1 bg-blue-700">
                    <span className='flex justify-center items-center p-4 bg-white text-blue-700 rounded-full cursor-pointer'><FaGoogle></FaGoogle></span>
                </div>
            </form>
            <div className="basis-[50%]">
                <img src={img} className='w-full h-full' alt="login image" />
            </div>
        </div>
    )
}

export default Register
