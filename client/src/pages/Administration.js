import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateUser from "../components/forms/UpdateUser";
import { getUsers } from "../features/users/allUsersSlice";

const Administration = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { allUsers } = useSelector((state) => state.users);

   const [selectedUser, setSelectedUser] = useState(user);

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch, selectedUser.name]);

   const handleOnChange = (e) => {
      if (e.target.value !== "") {
         allUsers.filter((user) => {
            if (user._id === e.target.value) {
               setSelectedUser(user);
            }
         });
      }
   };

   return (
      <div>
         <h2>Administration</h2>
         <p>
            {user.name} is {user.isAdmin ? "an" : "a"}{" "}
            {user.isAdmin ? "Administrator" : "Non-Administrator"}
         </p>

         <select name="teamMembers" onChange={handleOnChange}>
            <option value="">Select a dev</option>
            {allUsers.map((user) => (
               <option key={user._id} value={user._id}>
                  {user.name}
               </option>
            ))}
         </select>

         {user.isAdmin && <UpdateUser selectedUser={selectedUser} />}
      </div>
   );
};

export default Administration;
