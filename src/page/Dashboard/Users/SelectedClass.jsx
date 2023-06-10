import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider'
import { Button } from 'flowbite-react'
import { FaTrash } from 'react-icons/fa'
import Swal from 'sweetalert2'

function SelectedClass() {
    const { user } = useContext(AuthContext)
    const [selectedClass, setSelectedClass] = useState([])

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/selected/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    setSelectedClass(data);
                })
        }
    }, [user])

    const handleDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/selected/${id}`, {
                    method: "DELETE",
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.acknowledged) {
                            Swal.fire(
                                'Deleted!',
                                'Your Selected class has been deleted.',
                                'success'
                            )
                            const remaining = selectedClass.filter(item => item._id !== id);
                            setSelectedClass(remaining)
                        }
                    })
            }
        })
    }

    return (
        <div className="p-32">
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Selected Classes</h1>
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
                                @Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedClass.map((item, index) => <tr key={item._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    {item?.className}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.email}
                                </td>
                                <td className="px-6 py-4">
                                    ${item?.price}
                                </td>
                                <td className="px-6 py-4 flex items-center gap-2">
                                    <Button onClick={() => handleDelete(item._id)} gradientDuoTone="purpleToBlue"><FaTrash className='text-xl' /></Button>
                                    <Button gradientDuoTone="cyanToBlue">
                                        PAY
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

export default SelectedClass
