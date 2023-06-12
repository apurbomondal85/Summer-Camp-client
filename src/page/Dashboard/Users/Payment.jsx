
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useContext, useEffect, useState } from 'react'
import CheckoutForm from './CheckoutForm';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../../Provider/AuthProvider';

const stripePromise = loadStripe(`${import.meta.env.VITE_PAYMENT_PK}`);
function Payment() {
    const { id } = useParams();
    const { user } = useContext(AuthContext)
    const [price, setPrice] = useState(0);
    useEffect(() => {
        if (user?.email) {
            fetch(`http://localhost:5000/selected/${user.email}`)
                .then(res => res.json())
                .then(data => {
                    const cardPrice = data.find(item => item._id === id);
                    setPrice(parseFloat(cardPrice.price))
                })
        }
    }, [user])


    return (
        <div className='p-32'>
            <h1 className="text-center text-slate-900 text-4xl font-bold my-4">Payment Now</h1>
            <div className='w-[50%] mx-auto mt-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm price={price}/>
                </Elements>
            </div>
        </div>
    )
}

export default Payment
