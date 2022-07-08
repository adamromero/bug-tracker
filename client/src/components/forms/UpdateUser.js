import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../features/users/allUsersSlice";
import { PrimaryButton } from "../../styles/Button";
import UserEditStyle from "../../styles/UserEditStyle";

const UpdateUser = ({ selectedUser }) => {
   const [userDetails, setUserDetails] = useState({});
   const [isAdminChecked, setIsAdminChecked] = useState(false);
   const dispatch = useDispatch();

   const handleEditUser = (e) => {
      e.preventDefault();
      dispatch(updateUser(userDetails));
   };

   const handleDeleteUser = (e) => {
      e.preventDefault();
      dispatch(deleteUser(userDetails._id));
   };

   const handleOnChange = (e) => {
      setUserDetails((prevState) => ({
         ...prevState,
         [e.target.name]:
            e.target.name === "isAdmin" ? e.target.checked : e.target.value,
      }));
      if (e.target.name === "isAdmin") {
         setIsAdminChecked(!isAdminChecked);
      }
   };

   useEffect(() => {
      setUserDetails(selectedUser);
      setIsAdminChecked(selectedUser.isAdmin);
   }, [selectedUser]);

   return (
      <UserEditStyle>
         <h3>Update user information</h3>
         <h4>{selectedUser.name}</h4>

         <form onSubmit={handleEditUser}>
            <label>
               Name:
               <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={handleOnChange}
                  value={userDetails.name || ""}
               />
            </label>
            <label>
               Email:
               <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleOnChange}
                  value={userDetails.email || ""}
               />
            </label>

            <label className="inline-label">
               Administrator:
               <input
                  type="checkbox"
                  name="isAdmin"
                  onChange={(e) => {
                     handleOnChange(e);
                  }}
                  checked={isAdminChecked}
                  value={isAdminChecked}
               />
            </label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
               <PrimaryButton type="submit">Submit</PrimaryButton>
               <PrimaryButton onClick={handleDeleteUser}>
                  Remove User
               </PrimaryButton>
            </div>
         </form>
      </UserEditStyle>
   );
};

export default UpdateUser;