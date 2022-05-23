import axios from "axios";

const register = async (user) => {
   const response = await axios.post("/api/users", user);
   return response.data;
};

const login = async (user) => {
   const response = await axios.post("/api/users/login", user);
   return response.data;
};

const logout = async () => {
   localStorage.removeItem("user");
};

const authService = {
   register,
   login,
   logout,
};

export default authService;
