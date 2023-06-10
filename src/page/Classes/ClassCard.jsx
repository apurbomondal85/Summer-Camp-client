
import { Button } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';

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


    const handleSelect = () => {

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
                    <Button gradientDuoTone="purpleToBlue" className='w-full' disabled={item?.availableSeats <= 0 || currentUser?.role !== "user" ? true : false} onClick={handleSelect} >Select</Button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard
