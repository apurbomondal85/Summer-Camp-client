
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import FeedbackModal from './FeedbackModal';
import { Button } from 'flowbite-react';

function ManageClass() {
    const [classes, setClasses] = useState([]);
    const [auto, setAuto] = useState('');
    const [id, setId] = useState('');
    const [openModal, setOpenModal] = useState();
    const props = { openModal, setOpenModal };

    useEffect(() => {
        fetch("http://localhost:5000/Classes")
            .then(res => res.json())
            .then(data => {
                setClasses(data)
            })
    }, [auto])

    const handleApprove = (id) => {
        updateStatus(id, "Approved");
    }
    const handleDeny = (id) => {
        updateStatus(id, "Denied");
    }

    const updateStatus = (id, status) => {
        fetch(`http://localhost:5000/Classes/${id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ status })

        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast('Class is approved', {
                        position: "top-right",
                        autoClose: 1000,
                    });
                    setAuto(true)
                }
            })
    }

    const handleFeedbackBtn = (id) => {
        props.setOpenModal('form-elements')
        setId(id)
    }

    return (
        <div className="p-4">
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Manage Classes</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-12">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                #
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class Image
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Class Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Instructor Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Instructor Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Available Seats
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Price
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            classes.map((item, index) => <tr key={item._id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {index + 1}
                                </th>
                                <td className="px-6 py-4">
                                    <img src={item?.image} className='h-16 w-16 rounded-xl' alt="" />
                                </td>
                                <td className="px-6 py-4">
                                    {item?.className}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.instructor}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.email}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.availableSeats}
                                </td>
                                <td className="px-6 py-4">
                                    ${item?.price}
                                </td>
                                <td className="px-6 py-4">
                                    {item?.status}
                                </td>
                                <td className="px-6 py-4 flex flex-col gap-2">
                                    <Button disabled={item?.status !== "pending" ? true : false} onClick={() => handleApprove(item?._id)} gradientDuoTone="purpleToBlue">
                                        Approve
                                    </Button>
                                    <Button disabled={item?.status !== "pending" ? true : false} onClick={() => handleDeny(item?._id)} gradientDuoTone="purpleToPink">
                                        Deny
                                    </Button>
                                    <Button onClick={() => handleFeedbackBtn(item?._id)} gradientDuoTone="greenToBlue">
                                        Feedback
                                    </Button>
                                </td>
                            </tr>
                            )
                        }
                    </tbody>
                </table>
                <FeedbackModal props={props} id={id}></FeedbackModal>
            </div>
            <ToastContainer />
        </div>
    )
}

export default ManageClass
