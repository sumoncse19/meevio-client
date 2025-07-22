import { useLocation, useNavigate,  } from "react-router-dom";
import { useState, useEffect } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.init";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const location = useLocation();
  const [defaultEmail, setDefaultEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const emailFromQuery = params.get("email");
  
    // check if email is valid
    if (emailFromQuery && validateEmail(emailFromQuery)) {
      setDefaultEmail(emailFromQuery);
    } else {
      toast.error("Please enter a valid email first.");
      navigate("/sign-in");
    }
  }, [location]);
  
  // helper function
  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmitReset = async () => {
    try {
      await sendPasswordResetEmail(auth, defaultEmail);
      toast.success("Password reset link sent to your email!");
      navigate('/sign-in')
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-10 px-2">
      <div className="max-w-sm w-full bg-white p-7 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <p className="text-center text-gray-600 mb-4">Enter your email to receive a reset link</p>
        
        <input
          type="email"
          value={defaultEmail}
          readOnly
          className="w-full px-4 py-2 border rounded-lg mb-4 bg-gray-100 text-gray-700"
        />

        <button
          type="button"
          onClick={handleSubmitReset}
          className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 mt-5"
        >
          Send Reset Link
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
