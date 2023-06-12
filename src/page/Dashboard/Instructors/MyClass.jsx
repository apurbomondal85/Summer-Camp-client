
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider';
import { Button } from 'flowbite-react';
import Swal from 'sweetalert2';

function MyClass() {
    const { user } = useContext(AuthContext)
    const [myClass, setMyClass] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetch(`https://summer-camp-server-sepia.vercel.app/classes/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setMyClass(data);
                })
        }
    }, [user])

    const handleFeedback = (feedback) => {
        if (feedback) {
            Swal.fire(`${feedback}`)
        }
    }

    return (
        <div className='p-32'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">My Class</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Enroll Student
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Feedback
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myClass.map((item, index) => <tr key={item._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {item?.className}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.totalEnroll}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.status}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <Button onClick={() => handleFeedback(item?.feedback)} gradientDuoTone="cyanToBlue">
                                        Feedback
                                    </Button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyClass
