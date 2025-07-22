import axios from 'axios';

const useImageUpload = () => {
    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        const apiKey = import.meta.env.VITE_IMAGE_HOSTING_KEY;

        try {
            const res = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKey}`, formData);
            console.log(res.data.data.display_url);
            return res.data.data.display_url;
        } catch (error) {
            console.error("Image upload failed", error);
            return null;
        }
    };

    return { uploadImage };
};

export default useImageUpload;