
import { Button } from 'flowbite-react'
import { useContext, useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import img from '../../assets/images/login.jpg'
import { AuthContext } from '../../Provider/AuthProvider';
import { motion } from 'framer-motion';

function Register() {
    const { registers, google, updateUser } = useContext(AuthContext);
    const [show, setShow] = useState(false)
    const [match, setMatch] = useState(false);
    const [error, setError] = useState();
    const [passError, setPassError] = useState('');
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        const name = data.name;
        const email = data.email;
        const password = data.password;
        const confirmPass = data.confirmPass;
        const photo = data.photo;
        setMatch(false)
        setPassError('')
        if (!/[!@#$%^&*][A-Z]/.test(password) || password.length < 6) {
            return setPassError(<p className='text-red-600'>Password must be at least 6 characters long, contain a capital letter, and a special character.</p>)
        }

        if (password !== confirmPass) {
            return setMatch(true)
        }

        registers(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                updateUser(user, name, photo).then(() => postUser(user)).catch();
                navigate(from)
                setError('')
                reset()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorCode)
            });
    }

    const handleGoogle = () => {
        google()
            .then((result) => {
                const user = result.user;
                navigate(from)
                postUser(user)
            }).catch((error) => {
                const errorCode = error.code;
                setError(errorCode)
            });
    }

    const postUser = (user) => {
        const { displayName, email, photoURL } = user;
        fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ name: displayName, email, role: "user", image: photoURL })
        })
            .then(res => res.json())
            .then(data)
    }

    return (
        <div className='container flex flex-col lg:flex-row justify-center items-center gap-8 mt-24 py-12'>
            <motion.form
                className='basis-[50%]'
                onSubmit={handleSubmit(onSubmit)}
                initial={{ x: -500 }}
                animate={{ x: 0 }}
                transition={{ duration: 1 }}
            >
                <div className="mb-6">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input type="text" id="name" name='name' {...register("name")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your name" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" name='email' {...register("email")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="xyz@gmail.com" required />
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                    <input type={show ? "text" : "password"} id="password" name='password' {...register("password")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {
                        !show ? <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(true)}><FaEyeSlash></FaEyeSlash></span>
                            :
                            <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(false)}><FaEye></FaEye></span>
                    }
                </div>
                <div className="mb-6 relative">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                    <input type={show ? "text" : "password"} id="confirm-password" name='confirmPass' {...register("confirmPass")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                    {
                        !show ? <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(true)}><FaEyeSlash></FaEyeSlash></span>
                            :
                            <span className="absolute right-5 top-[60%] cursor-pointer" onClick={() => setShow(false)}><FaEye></FaEye></span>
                    }
                </div>
                {
                    match && <p className='text-red-700 my-4'>Your Passwords is not match please try again</p>
                }
                <div className="mb-6">
                    <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Photo Url</label>
                    <input type="url" id="photo" name='photo' {...register("photo")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Photo Url" required />
                </div>
                <div className="flex items-start mb-6">
                    <div className="flex items-center h-5">
                        <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                    </div>
                    <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                </div>
                {passError}
                {
                    error && <p className='text-red-700 my-4'>{error}</p>
                }
                <Button
                    type="submit"
                    gradientDuoTone="purpleToBlue"
                >
                    Register
                </Button>
                <p className="mt-4">Already have an account? please <Link className="text-blue-700 underline" to="/login">Login</Link></p>
                <div className="flex justify-center mt-6 py-1 bg-blue-700">
                    <span onClick={handleGoogle} className='flex justify-center items-center p-4 bg-white text-blue-700 rounded-full cursor-pointer'><FaGoogle></FaGoogle></span>
                </div>
            </motion.form>
            <div className="basis-[50%]">
                <motion.img
                    src={img}
                    alt="Moving Image"
                    initial={{ x: 500 }}
                    animate={{ x: 0 }}
                    transition={{ duration: 1 }}
                />
            </div>
        </div>
    )
}

export default Register
