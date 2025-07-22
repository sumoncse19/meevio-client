import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EditProfile = () => {
const { user, profileUpdate } = useAuth(); 
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");

  const handleUpdate = async(e) => {
    // need add validation here and upgrade to firebase and instead of photoURL add image upload service
    e.preventDefault();
    if (!name.trim()) {
        toast.error("Name cannot be empty!");
        return;
    }

    try {
        await profileUpdate(name, photoURL);
        toast.success("Profile updated successfully!");
    } catch (error) {
        console.error("Error updating profile:", error);
        toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className="max-w-md mx-auto p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Edit Profile</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={user?.email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-lg"
            disabled
          />
        </div>
        <div className="mb-3">
          <label className="block text-sm font-medium">Profile Picture URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-600 text-white py-2 rounded-lg mt-3 hover:bg-purple-700"
        >
          Update Profile
        </button>
      </form>
    </motion.div>
  );
};

export default EditProfile;
// Compare this snippet from CLIENT/src/pages/Profile/EditProfile.jsx: