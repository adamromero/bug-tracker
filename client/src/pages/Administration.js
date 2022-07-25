import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UpdateUser from "../components/forms/UpdateUser";
import { getUsers } from "../features/users/allUsersSlice";
import Spinner from "../styles/Spinner";
import PageStyle from "../styles/PageStyle";

const Administration = () => {
   const dispatch = useDispatch();
   const { user } = useSelector((state) => state.auth);
   const { allUsers, isLoading } = useSelector((state) => state.users);
   const [selectedUser, setSelectedUser] = useState(user);

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch, selectedUser.name]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <PageStyle>
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
                     {allUsers.map((currentUser) => (
                        <tr
                           key={currentUser._id}
                           style={user.isAdmin ? { cursor: "pointer" } : {}}
                           onClick={() => setSelectedUser(currentUser)}
                        >
                           <td>{currentUser.name}</td>
                           <td>{currentUser.email}</td>
                           <td>{currentUser.isAdmin ? "Yes" : "No"}</td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
            {user.isAdmin && <UpdateUser selectedUser={selectedUser} />}
         </div>
      </PageStyle>
   );
};

export default Administration;
