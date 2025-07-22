import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { Link, useLocation } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";

function CheckoutForm() {
  const { user, userLogOut } = useAuth();
  const location = useLocation();
  // console.log(location?.state?.plan);
  const price = location?.state?.price;
  const plan = location?.state?.plan;
  // console.log(price, " price", name, "name");
  const axiosSecure = useAxiosSecure();

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [id, setid] = useState("");

  // Fetch Payment Intent from Backend
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const response = await axiosSecure.post(
          "https://meevio-vfak.onrender.com/create-payment-intent",
          {
            amount: price | 1,
            currency: "usd",
          }
        );
        setClientSecret(response.data.clientSecret);
      } catch (err) {
        console.log(err.code);
        setError("Failed to initialize payment");
        console.error(
          "Payment intent error:",
          err.response?.data || err.message
        );
      }
    };
    fetchPaymentIntent();
  }, []);
  console.log(clientSecret);

  // Handle Payment Submission
  const handleSubmit = async (event) => {
    console.log(clientSecret, " submit");

    event.preventDefault();
    if (!stripe || !elements || !clientSecret) return;

    setLoading(true);
    setError(null);

    try {
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: user?.email,
              // Add more dynamic data as needed:
              // email: userEmail,
              // address: {
              //   line1: shippingAddress,
              //   postal_code: zipCode
              // }
            },
          },
        });

      if (stripeError) {
        throw stripeError;
      }
      setid(paymentIntent.id);

      await axios
        .post("https://meevio-vfak.onrender.com/payment-success", {
          email: user.email,
          plan: plan,
          price: price,
          name: user?.name,
          id: paymentIntent.id,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((error) => {
          console.log(error);
        });

      setPaymentSuccess(true);
      console.log("Payment succeeded:", paymentIntent);

      await axiosSecure.patch(`/users/plan/${user?.email}`, { plan });
    } catch (err) {
      setError(err.message || "Payment failed");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-10">
      <div className="max-w-md mx-auto  px-6 py-8 bg-gray-900 text-white rounded-2xl shadow-lg border border-gray-700">
        {paymentSuccess ? (
          <div className="space-y-2 text-center">
            <h2 className="text-2xl font-semibold animated-gradient-text">
              Payment Successful
            </h2>
            <p className="  text-gray-300">
              <span className="font-semibold">Plan:</span> {plan}
            </p>
            <p className="  text-gray-300">
              <span className="font-semibold">Price:</span> ${price}
            </p>
            <p className="  text-gray-300">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="  text-gray-300">
              <span className="font-semibold">Transaction ID:</span> {id}
            </p>
            <div className="pt-3">
              <Link
                to="/"
                className="w-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-gray-100 font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap "
              >
                Go to Home
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <div className="">
                  <span className="text-gray-300">Plan:</span>{" "}
                  <span className="font-semibold">{plan}</span>
                </div>
                <div className="">
                  <span className="text-gray-300">Price:</span>{" "}
                  <span className="font-semibold">${price}</span>
                </div>
              </div>
              {/* <div className="p-3 bg-gray-800 rounded-md">
                <span className="text-gray-300">Your Email:</span> <span className="font-semibold">{user?.email}</span>
              </div> */}
            </div>

            <div className="p-4 bg-gray-800 rounded-md">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffffff",
                      "::placeholder": {
                        color: "#cbd5e1",
                      },
                    },
                    invalid: {
                      color: "#f87171",
                    },
                  },
                }}
              />
            </div>

            {error && (
              <div className="bg-red-600 bg-opacity-20 text-red-400 p-3 rounded-md">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap ${
                !stripe || loading
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? (
                <span className="flex justify-center items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                "Pay Now"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CheckoutForm;
