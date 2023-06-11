
import { Link, Outlet } from 'react-router-dom'
import img from '../assets/images/logo.jpg'
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Provider/AuthProvider';

function Dashboard() {
    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data);
                })
        }
    }, [user])

    return (
        <div className=''>
            <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button>

            <aside id="separator-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-100 dark:bg-gray-800 pl-12">
                    <img src={img} className=' h-8 lg:h-12 my-8' alt="" />
                    {
                        currentUser?.role === "user" ?
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link to="/dashboard/selected" className='text-slate-700 font-semibold'>Selected Class</Link>
                                </li>
                                <li>
                                    <Link className='text-slate-700 font-semibold'>Enrolled Class</Link>
                                </li>
                            </ul>
                            : currentUser?.role === "instructor" ?
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <Link to="/dashboard/addClass" className='text-slate-700 font-semibold'>Add Class</Link>
                                    </li>
                                    <li>
                                        <Link to="/dashboard/myClass" className='text-slate-700 font-semibold'>My Class</Link>
                                    </li>
                                </ul> : currentUser?.role === "admin" &&
                                <ul className="space-y-2 font-medium">
                                    <li>
                                        <Link to="/dashboard/manageClasses" className='text-slate-700 font-semibold'>Manage Classes</Link>
                                    </li>
                                    <li>
                                        <Link className='text-slate-700 font-semibold'>Manage Users</Link>
                                    </li>
                                </ul>

                    }
                    <ul className="pt-4 mt-4 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">
                        <li>
                            <Link to="/" className='text-slate-700 font-semibold'>Home</Link>
                        </li>
                        <li>
                            <Link to="/instructors" className='text-slate-700 font-semibold'>Instructors</Link>
                        </li>
                        <li>
                            <Link to="/classes" className='text-slate-700 font-semibold'>Classes</Link>
                        </li>
                    </ul>
                </div>
            </aside>

            <div className="p-4 sm:ml-64">
                <Outlet />
            </div>
                
        </div>
    )
}

export default Dashboard
