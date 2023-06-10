
import { Button } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';

function ClassCard({ item }) {
    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/users/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data)
                })
        }
    }, [user])


    const handleSelect = (item) => {
        const selectedClass = { className: item.className, email: currentUser.email, price: item?.price };
        fetch("http://localhost:5000/selected", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(selectedClass)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success("Selected is Success", {
                        position: "top-right",
                        autoClose: 1000
                    })
                }
            })
    }

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow">
            <img src={item?.image} className='h-[200px] lg:h-[300px] w-full object-cover' alt="" />
            <div className="p-5">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item?.className}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Instructor : {item?.instructor}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Available Seats : {item?.availableSeats}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Price : ${item?.price}</p>
                <div className="">
                    <Button gradientDuoTone="purpleToBlue" className='w-full' disabled={item?.availableSeats <= 0 || currentUser?.role !== "user" ? true : false} onClick={() => handleSelect(item)} >Select</Button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard
