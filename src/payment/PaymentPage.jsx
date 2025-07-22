import React from 'react'
import { CheckoutProvider, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm ';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY)

function PaymentPage() {
  const location = useLocation();
  const { price, name } = location.state || {};

  return (
    <div>
      <Elements stripe={stripePromise}>
        <CheckoutForm price={price} name={name} />
      </Elements>
    </div>
  )
}

export default PaymentPage