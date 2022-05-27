import axios from "axios";

const getUsers = async () => {
   const response = await axios.get("/api/allUsers");
   return response.data;
};

const allUsersService = {
   getUsers,
};

export default allUsersService;
