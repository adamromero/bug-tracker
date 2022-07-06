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

   const handleUserData = (user) => {
      setSelectedUser(user);
      //console.log(user);
   };

   return (
      <div>
         <h2>Administration</h2>
         <p>
            {user.name} is {user.isAdmin ? "an" : "a"}{" "}
            {user.isAdmin ? "Administrator" : "Non-Administrator"}
         </p>
         <ul>
            {allUsers.map((user) => (
               <li key={user._id} onClick={() => handleUserData(user)}>
                  {user.name}
               </li>
            ))}
         </ul>
         {user.isAdmin && <UpdateUser selectedUser={selectedUser} />}
      </div>
   );
};

export default Administration;
