import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser, deleteUser } from "../../features/users/allUsersSlice";
import { PrimaryButton } from "../../styles/Button";
import UserEditStyle from "../../styles/UserEditStyle";

const UpdateUser = ({ selectedUser }) => {
   const [userDetails, setUserDetails] = useState(selectedUser);
   const [isAdminChecked, setIsAdminChecked] = useState(false);
   const [isVerifiedChecked, setIsVerifiedChecked] = useState(false);
   const dispatch = useDispatch();

   const handleEditUser = (e) => {
      e.preventDefault();
      console.log(userDetails);
      dispatch(updateUser(userDetails));
   };

   const handleDeleteUser = (e) => {
      e.preventDefault();
      console.log("delete user: ", userDetails._id);
      dispatch(deleteUser(userDetails._id));
   };

   const handleIsAdminChange = (e) => {
      setUserDetails((prevState) => ({
         ...prevState,
         [e.target.name]:
            e.target.name === "isAdmin" ? e.target.checked : e.target.value,
      }));
      if (e.target.name === "isAdmin") {
         setIsAdminChecked(!isAdminChecked);
      }
   };

   const handleIsVerifiedChange = (e) => {
      setUserDetails((prevState) => ({
         ...prevState,
         [e.target.name]:
            e.target.name === "isVerified" ? e.target.checked : e.target.value,
      }));
      if (e.target.name === "isVerified") {
         setIsVerifiedChecked(!isVerifiedChecked);
      }
   };

   const handleOnChange = (e) => {
      setUserDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
      }));
   };

   useEffect(() => {
      setUserDetails(selectedUser);
      setIsAdminChecked(selectedUser.isAdmin);
      setIsVerifiedChecked(selectedUser.isVerified);
   }, [dispatch]);

   return (
      <UserEditStyle>
         <h3>Update user information</h3>
         <h4>{selectedUser.name}</h4>

         <form>
            <label>
               Name:
               <input
                  className="border	border-gray-500 dark:text-black"
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
                  className="border	border-gray-500 dark:text-black"
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
                     handleIsAdminChange(e);
                  }}
                  checked={isAdminChecked}
                  value={isAdminChecked}
               />
            </label>
            <label className="inline-label">
               Verified:
               <input
                  type="checkbox"
                  name="isVerified"
                  onChange={(e) => {
                     handleIsVerifiedChange(e);
                  }}
                  checked={isVerifiedChecked}
                  value={isVerifiedChecked}
               />
            </label>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
               <PrimaryButton onClick={handleEditUser}>Submit</PrimaryButton>
               <PrimaryButton onClick={handleDeleteUser}>
                  Remove User
               </PrimaryButton>
            </div>
         </form>
      </UserEditStyle>
   );
};

export default UpdateUser;
