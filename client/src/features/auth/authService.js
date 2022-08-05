import axios from "axios";

const register = async (user) => {
   const response = await axios.post("/api/users", user);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }

   return response.data;
};

const updateImage = async (user) => {
   const response = await axios.put(`/api/users`, user);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }

   return response.data;
};

const updatePassword = async (user) => {
   const response = await axios.put("/api/users", user);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }

   return response.data;
};

const login = async (user) => {
   const response = await axios.post("/api/users/login", user);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }

   return response.data;
};

const logout = async () => {
   localStorage.removeItem("user");
};

const authService = {
   register,
   login,
   logout,
   updateImage,
   updatePassword,
};

export default authService;
