import axios from "axios";

const uploadImage = async (image) => {
   const response = await axios.post("/api/upload", image);
   return response.data;
};

const imageService = {
   uploadImage,
};

export default imageService;
