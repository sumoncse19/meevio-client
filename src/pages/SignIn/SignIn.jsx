import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../provider/AuthProvider";
import dot from "../../assets/dot.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SocialLogin from "../../components/SocialLogin";

const SignIn = () => {
  const { loginUser } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    loginUser(data.email, data.password)
      .then(() => {
        toast.success("Logged in successfully.");
        navigate("/meeting");
        reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center bg-[#151515] py-10 px-2">
      <div className="relative max-w-[992px] w-full bg-[#0f131c] p-7 md:p-10 lg:p-16 shadow-lg rounded-lg overflow-hidden border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 max-w-4xl w-full items-center md:flex md:flex-row-reverse">
          {/* Right Section - Promotional Message */}
          <div className="text-center md:text-left p-6 order-1 md:order-none mt-12 md:mt-0">
            <div className="flex items-center justify-center md:justify-start">
              <span className="h-[1px] bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-[20%]"></span>
              <span className="text-purple-600 text-5xl font-semibold italic w-[10%] text-center mt-4">
                “
              </span>
              <span className="h-[1px] bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-[70%]"></span>
            </div>
            <p className="bg-gradient-to-l from-[#32c6fc] to-[#8659d3] bg-clip-text text-transparent text-lg font-semibold">
              Sign in to{" "}
              <span className="font-bold italic underline">stay connected</span>{" "}
              with your team and manage your meetings easily.
            </p>
            <div className="flex items-center justify-center md:justify-start">
              <span className="h-[1px] bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-[70%]"></span>
              <span className="text-[#32c6fc] text-5xl font-semibold italic w-[10%] text-center mt-4">
                “
              </span>
              <span className="h-[1px] bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-[20%]"></span>
            </div>
          </div>

          {/* Left Section - Sign In Form */}
          <div className="bg-[#151515] p-4 lg:p-8 rounded-2xl shadow-lg w-full max-w-md mx-auto z-20 order-2 md:order-none border border-gray-800">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2 text-gray-300 animated-gradient-text">
                Welcome Back
              </h2>
            </div>
            <p className="text-gray-300 text-center mb-4">
              Sign in to your Meevio account
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email */}
              <label className="block text-gray-300 text-sm font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                placeholder="Enter your email"
                className="w-full p-2 border border-gray-800 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#32c6fc]"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}

              {/* Password */}
              <label className="block text-gray-300 text-sm font-semibold mb-1 mt-2">
                Password
              </label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                placeholder="Enter your password"
                className="w-full p-2 border border-gray-800 bg-gray-900 text-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#32c6fc]"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              {/* Forgot password */}
              <div className="text-right mt-1">
                <Link
                  to={`/forgot-password?email=${watch("email")}`}
                  className="text-sm text-[#32c6fc] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button className="bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 w-full mt-4">
                Sign In
              </button>
            </form>

            {/* Google Sign In */}
            <div className="text-center my-2 text-gray-500">OR</div>
            <SocialLogin />

            <p className="text-center text-gray-300 mt-4">
              New here?{" "}
              <Link to="/sign-up">
                <span className="text-[#32c6fc] font-semibold cursor-pointer">
                  Sign up
                </span>
              </Link>
            </p>
          </div>
        </div>

        {/* Corner Designs */}
        <div className="absolute top-0 left-0 bg-gradient-to-l from-[#32c6fc] to-[#8659d3] w-44 h-20 rounded-tl-lg"></div>
        <div className="absolute bottom-0 right-0 bg-gradient-to-r from-[#32c6fc] to-[#8659d3] w-52 h-28 rounded-br-lg "></div>

        {/* Dot Image */}
        <img
          src={dot}
          alt="Doted..."
          className="absolute -bottom-[20px] md:bottom-4 lg:bottom-8 -left-5 md:left-[330px] lg:left-[400px]"
        />
      </div>
    </div>
  );
};

export default SignIn;
