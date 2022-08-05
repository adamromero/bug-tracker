import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../../features/users/allUsersSlice";
import { PrimaryButton } from "../../styles/Button";
import {
   useUserValidation,
   userValidationMessage,
} from "../../utils/userValidation";

const UpdateUser = ({ currentUser }) => {
   const [userDetails, setUserDetails] = useState(currentUser);
   const [isAdminChecked, setIsAdminChecked] = useState(false);
   const [isVerifiedChecked, setIsVerifiedChecked] = useState(false);
   const isUserAuthorized = useUserValidation();
   const dispatch = useDispatch();

   const handleEditUser = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(updateUser(userDetails));
         window.location.reload();
      }
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
      setUserDetails(currentUser);
      setIsAdminChecked(currentUser.isAdmin);
      setIsVerifiedChecked(currentUser.isVerified);
   }, [dispatch]);

   return (
      <>
         <h3>Update user information</h3>
         <h4>{currentUser.name}</h4>
         {userValidationMessage(isUserAuthorized)}
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
            <label className="flex items-center max-w-[150px]">
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
            <label className="flex items-center max-w-[100px]">
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
            <div className="flex justify-between">
               <PrimaryButton
                  onClick={handleEditUser}
                  disabled={!isUserAuthorized}
               >
                  Submit
               </PrimaryButton>
            </div>
         </form>
      </>
   );
};

export default UpdateUser;
