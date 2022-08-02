import React from "react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../features/tickets/ticketSlice";

import {
   useUserValidation,
   userValidationMessage,
} from "../../utils/userValidation";

import { PrimaryButton } from "../../styles/Button";

const DeleteTicket = (ticketId) => {
   const dispatch = useDispatch();

   const isUserAuthorized = useUserValidation();

   const handleDeleteTicket = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(deleteTicket(ticketId.id));
      }
   };

   return (
      <>
         <p>Would you like to delete this ticket?</p>
         {userValidationMessage(isUserAuthorized)}
         <form onSubmit={handleDeleteTicket}>
            <PrimaryButton type="submit" disabled={!isUserAuthorized}>
               Delete
            </PrimaryButton>
         </form>
      </>
   );
};

export default DeleteTicket;
