
import { data } from 'autoprefixer'
import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'

function ManageUsers() {
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("http://localhost:5000/users")
            .then(res => res.json())
            .then(data => {
                setUsers(data)
            })
    }, [])

    const handleInstructor = (email) => {
        updateRole(email, "instructor")
    }

    const updateRole = (email, role) => {
        fetch(`http://localhost:5000/users?email=${email}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ role })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast('Class is approved', {
                        position: "top-right",
                        autoClose: 1000,
                    });
                    setAuto(true)
                }
            })
    }


    return (
        <div className="p-20">
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Manage Users</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Role
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((item, index) => <tr key={item._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={item?.image} className='h-16 w-16 rounded-xl' alt="" />
                                </td>
                                <td className="px-6 py-4">
                                    {item?.name}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.role}
                                </td>
                                <td className="px-6 py-4 flex flex-col gap-2">
                                    <Button onClick={() => handleInstructor(item?.email)} disabled={false} gradientDuoTone="purpleToBlue">
                                        Make Instructor
                                    </Button>
                                    <Button disabled={false} gradientDuoTone="purpleToPink">
                                        Make Admin
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

export default ManageUsers
