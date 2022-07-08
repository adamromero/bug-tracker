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

   return (
      <div>
         <h2>Administration</h2>
         <p>{user.isAdmin ? "You have administrator privileges" : ""}</p>
         <div style={{ display: "flex", gap: "45px" }}>
            <div>
               <h3>Team</h3>
               <table style={{ textAlign: "left", width: "100%" }}>
                  <thead>
                     <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Is Admin</th>
                     </tr>
                  </thead>
                  <tbody>
                     {allUsers.map((user) => (
                        <tr
                           key={user._id}
                           style={{ cursor: "pointer" }}
                           onClick={() => setSelectedUser(user)}
                        >
                           <td>{user.name}</td>
                           <td>{user.email}</td>
                           <td>{user.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {user.isAdmin && <UpdateUser selectedUser={selectedUser} />}
         </div>
      </div>
   );
};

export default Administration;
