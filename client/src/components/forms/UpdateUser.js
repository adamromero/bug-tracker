import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../features/users/allUsersSlice";

const UpdateUser = ({ selectedUser }) => {
   const [userDetails, setUserDetails] = useState({});
   const [isAdminChecked, setIsAdminChecked] = useState(false);
   const dispatch = useDispatch();

   const handleEditUser = (e) => {
      e.preventDefault();
      console.log(userDetails);
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
      <div>
         <h3>Update user information</h3>
         {selectedUser.name}

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
            <br />
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
            <br />
            <label>
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
            <br />
            <button type="submit">Submit</button>
            <button type="submit" onClick={handleDeleteUser}>
               Remove User
            </button>
         </form>
      </div>
   );
};

export default UpdateUser;
