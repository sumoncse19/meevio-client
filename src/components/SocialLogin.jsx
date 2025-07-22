import React from 'react';
import { FaGoogle } from 'react-icons/fa';
import useAuth from "../hooks/useAuth";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAxiosPublic from '../hooks/useAxiosPublic';

const SocialLogin = () => {
    const { loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    // Google Sign In
    const signInWithGoogle = async () => {
        console.log("Google Sign In");
        try {
            const result = await loginWithGoogle();

            const userInfo = {
                name: result?.user?.displayName,
                email: result?.user?.email,
                photo: result?.user?.photoURL,
                plan: "Basic"
            };
            console.log(userInfo);

            // Fetch existing users
            const { data: existingUsers } = await axiosPublic.get('/users');

            // Check if the user already exists
            const existingUser = existingUsers.find(user => user.email === userInfo.email);
            console.log(existingUsers);

            if (existingUser) {
                // User already exists, only log them in
                toast.success(`Welcome back, ${existingUser.name || 'User'}!`);
                navigate(location?.state?.from || '/');
            } else {
                // New user: Add user to the database
                const res = await axiosPublic.post('/users', userInfo);
                if (res.data.insertedId) {
                    toast.success(`Welcome, ${userInfo.name || 'User'}! Your account has been created.`);
                    navigate('/meeting');
                }
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong during sign in.");
        }
    };


    return (
        <button onClick={signInWithGoogle} className="w-full flex items-center justify-center bg-gray-800 text-white py-2 rounded-lg mb-2 hover:bg-transparent border border-gray-900 hover:border-gray-600 transition duration-300">
            <span className="mr-2">
                <FaGoogle />
            </span>
            Sign in with Google
        </button>
    );
};

export default SocialLogin;