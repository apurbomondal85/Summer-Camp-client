
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { Button } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../Provider/AuthProvider';

function CheckoutForm({ price }) {
    const { user } = useContext(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState();
    useEffect(() => {
        fetch("https://summer-camp-server-sepia.vercel.app/create-payment-intent", {
            method: "POST",
            headers: {},
            headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("secret-key")}`,
            },
            body: JSON.stringify({ price }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [price])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        console.log(clientSecret);
        const { paymentIntent, confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: user?.email || "unknown",
                        name: user?.displayName || "anonymous"
                    },
                },
            },
        );
        if (confirmError) {
            console.log(confirmError);
        }

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <Button gradientDuoTone="purpleToBlue" className='mt-8' type="submit" disabled={!stripe || clientSecret}>
                    Pay
                </Button>
            </form>
            {
                cardError && <p className="text-red-500 mt-4">{cardError}</p>
            }
        </>
    )
}
export default CheckoutForm
