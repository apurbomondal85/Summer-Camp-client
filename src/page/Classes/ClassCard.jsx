
import { Button } from 'flowbite-react'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ClassCard({ item }) {
    const { user } = useContext(AuthContext)
    const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            fetch(`https://summer-camp-server-sepia.vercel.app/users/${user?.email}`)
                .then(res => res.json())
                .then(data => {
                    setCurrentUser(data)
                })
        }
    }, [user])


    const handleSelect = (item) => {
        if (user) {
            const selectedClass = { className: item.className, email: currentUser.email, price: item?.price };
            fetch("https://summer-camp-server-sepia.vercel.app/selected", {
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
        } else {
            navigate('/login')
        }
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
                    <Button gradientDuoTone="purpleToBlue" className='w-full' disabled={item?.availableSeats <= 0 || currentUser?.role === "instructor" || currentUser?.role === "admin" ? true : false} onClick={() => handleSelect(item)} >Select</Button>
                </div>
            </div>
        </div>
    )
}

export default ClassCard
