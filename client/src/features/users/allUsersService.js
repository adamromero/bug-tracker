import axios from "axios";

const getUsers = async () => {
   const response = await axios.get("/api/allUsers");
   return response.data;
};

const updateUser = async (user) => {
   const response = await axios.put(`/api/allUsers/${user.id}`, user);

   if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
   }

   return response.data;
};

const deleteUser = async (id) => {
   const response = await axios.delete(`/api/allUsers/${id}`);
   return response.data;
};

const allUsersService = {
   getUsers,
   updateUser,
   deleteUser,
};

export default allUsersService;
