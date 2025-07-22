import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdUpgrade } from "react-icons/md";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { IoMdClose } from "react-icons/io";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import usePlan from "../../hooks/usePlan";

const ProfileDetails = () => {
  const { user, profileUpdate } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
  });
  const [plan] = usePlan();
  // console.log(plan);


  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleEdit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      if (!formData.displayName.trim()) {
        toast.error("Name cannot be empty!");
        return;
      }

      try {
        await profileUpdate(formData.displayName, formData.photoURL);
        // Update user profile
        const profileInfo = {
          name: formData.displayName,
          photo: formData.photoURL || user?.photoURL,
        }

        const res = await axiosSecure.patch(`/users/${user?.email}`, profileInfo)
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          // console.log('Profile Updated Successfully');
          toast.success('Profile Updated Successfully');
          // window.location.reload();
        }
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        photoURL: user.photoURL || "",
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="bg-[#151515] py-10 px-2">
      <div className="max-w-3xl mx-auto p-8 shadow-md rounded-2xl border border-gray-500">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-5">
            <img
              src={formData.photoURL || "https://i.ibb.co.com/5gDBVLDV/images.png"}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-[2px] border-purple-500 object-cover shadow-md"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-300">{formData.displayName || "User Name"}</h2>
              <p className="text-sm font-semibold text-gray-800 bg-[#32c6fc] rounded-full text-center border border-gray-950 px-4">{plan}</p>
            </div>
          </div>

          <Link
            to="/#our-plans"
            className="flex items-center gap-2 px-5 py-2.5 bg-[#32c6fc]  rounded-full hover:bg-[#32c6fcd0] transition duration-300 shadow-md font-semibold"
          >
            <MdUpgrade className="text-xl" />
            Upgrade Plan
          </Link>
        </div>

        {/* Profile Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label htmlFor="displayName" className="block text-sm font-medium text-gray-600 mb-1">
              Full Name
            </label>
            <input
              id="displayName"
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing
                ? "bg-white border-purple-400 focus:ring-2 focus:ring-purple-300"
                : "bg-gray-700 border-gray-500 cursor-not-allowed text-gray-400"
                }`}
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-gray-700 border-gray-500 cursor-not-allowed text-gray-400"
            />
          </div>

          {/* Photo URL */}
          <div className="md:col-span-2">
            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-600 mb-1">
              Photo URL
            </label>
            <input
              id="photoURL"
              type="text"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              disabled={!isEditing}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition ${isEditing
                ? "bg-white border-purple-400 focus:ring-2 focus:ring-purple-300"
                : "bg-gray-700 border-gray-500 cursor-not-allowed text-gray-400"
                }`}
            />
          </div>

          {/* Button */}
          <div className="md:col-span-2 flex justify-center items-center gap-4">
            <button
              onClick={handleToggleEdit}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition duration-200 shadow-md ${isEditing
                ? "bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                : "bg-gradient-to-r from-[#32c6fc] to-[#8659d3] px-6 py-2 rounded text-white font-medium hover:shadow-lg hover:shadow-[#32c6fc]/20 transition-all duration-300 cursor-pointer !rounded-button whitespace-nowrap"
                }`}
            >
              <FaEdit />
              {isEditing ? "Update Profile" : "Edit Profile"}
            </button>

            {isEditing && (
              <button
                onClick={handleCancelEdit}
                className="flex items-center gap-1 px-6 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition duration-200 shadow-md font-  bold"
              >
                <IoMdClose size={21} /> Cancel Update
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileDetails;


