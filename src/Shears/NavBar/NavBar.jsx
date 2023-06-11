
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.jpg'
import { Avatar, Button, Navbar } from 'flowbite-react'
import { AuthContext } from '../../Provider/AuthProvider'

function NavBar() {
    const { user, logOut } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({});
    console.log(user);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data);
                })
        }
    }, [user])

    const handleLogOut = () => {
        logOut().then().catch();
    }

    return (
        <div>
            <Navbar
                fluid
                rounded
                className="bg-white fixed w-full z-20 top-0 left-0 border-b border-gray-200"
            >
                <div className="container flex flex-wrap items-center justify-between mx-auto">
                    <Navbar.Brand href="https://flowbite-react.com">
                        <Link to="/" className="flex items-center">
                            <img src={logo} className="h-8 lg:h-12 mr-3" alt="Logo" />
                        </Link>
                    </Navbar.Brand>
                    <div className="flex md:order-2">
                        {
                            user ? <>
                                <Avatar
                                    className='hidden lg:block'
                                    title={user?.displayName ? user.displayName : "User Name"}
                                    bordered
                                    img={user?.photoURL}
                                    rounded
                                />
                                <Button
                                    onClick={handleLogOut}
                                    className='ml-2 hidden lg:block'
                                    gradientDuoTone="purpleToBlue"
                                >
                                    <p>
                                        Log out
                                    </p>
                                </Button>
                            </> :
                                <Link to="/login">
                                    <Button
                                        className='ml-2'
                                        gradientDuoTone="purpleToBlue"
                                    >
                                        <p>
                                            Login
                                        </p>
                                    </Button>
                                </Link>
                        }
                        <Navbar.Toggle />
                    </div>
                    <Navbar.Collapse>
                        {
                            user ? <div className='mb-3 space-y-2 flex flex-col justify-center items-center lg:hidden'>
                                <Avatar
                                    title={user.displayName ? user.displayName : "User Name"}
                                    bordered
                                    img={user?.photoURL}
                                    rounded
                                />
                                <Button
                                    onClick={handleLogOut}
                                    gradientDuoTone="purpleToBlue"
                                >
                                    <p>
                                        Log out
                                    </p>
                                </Button>
                            </div> :
                                <Link to="/login" className='block lg:hidden'>
                                    <Button
                                        gradientDuoTone="purpleToBlue"
                                    >
                                        <p>
                                            Login
                                        </p>
                                    </Button>
                                </Link>
                        }
                        <li>
                            <Link to="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to="/instructors" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Instructors</Link>
                        </li>
                        <li>
                            <Link to="/classes" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Classes</Link>
                        </li>
                        <li>
                            {
                                user && <Link to={currentUser.role === "user" ? "/dashboard/selected" : currentUser?.role === "instructor" ? "/dashboard/addClass" : currentUser?.role === "admin" && "/dashboard/manageClasses"} className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</Link>
                            }
                        </li>
                    </Navbar.Collapse>
                </div>
            </Navbar>

        </div>
    )
}

export default NavBar
