import React from "react";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../features/users/allUsersSlice";

import {
   useUserValidation,
   userValidationMessage,
} from "../../utils/userValidation";

import { PrimaryButton } from "../../styles/Button";

const DeleteUser = ({ id }) => {
   const dispatch = useDispatch();

   const isUserAuthorized = useUserValidation();

   const handleDeleteUser = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(deleteUser(id));
         window.location.reload();
      }
   };

   return (
      <>
         <p>Would you like to delete this user?</p>
         {userValidationMessage(isUserAuthorized)}
         <form onSubmit={handleDeleteUser}>
            <PrimaryButton type="submit" disabled={!isUserAuthorized}>
               Delete
            </PrimaryButton>
         </form>
      </>
   );
};

export default DeleteUser;
