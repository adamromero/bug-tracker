import axios from "axios";

const getImage = async (id) => {
   const response = await axios.get(`/api/aws/${id}`);
   return response.data;
};

const uploadImage = async (image) => {
   const response = await axios.post("/api/aws/", image);
   return response.data;
};

const deleteImage = async (id) => {
   const response = await axios.delete(`/api/aws/${id}`);
   return response.data;
};

const imageService = {
   getImage,
   uploadImage,
   deleteImage,
};

export default imageService;
