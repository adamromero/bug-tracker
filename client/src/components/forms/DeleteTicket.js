import React from "react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../features/tickets/ticketSlice";

import { PrimaryButton } from "../../styles/Button";

const DeleteTicket = (ticketId) => {
   const dispatch = useDispatch();

   const handleDeleteTicket = (e) => {
      e.preventDefault();
      dispatch(deleteTicket(ticketId.id));
   };

   return (
      <>
         <p>Would you like to delete this ticket?</p>
         <form onSubmit={handleDeleteTicket}>
            <PrimaryButton type="submit">Delete</PrimaryButton>
         </form>
      </>
   );
};

export default DeleteTicket;
