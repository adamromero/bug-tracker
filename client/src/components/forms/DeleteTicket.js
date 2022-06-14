import React from "react";
import { useDispatch } from "react-redux";
import { deleteTicket } from "../../features/tickets/ticketSlice";

import PrimaryButton from "../../styles/Button";

const DeleteTicket = (ticketId) => {
   const dispatch = useDispatch();

   const handleDeleteTicket = (e) => {
      e.preventDefault();
      dispatch(deleteTicket(ticketId.id));
   };

   return (
      <div>
         <form onSubmit={handleDeleteTicket}>
            <div className="header">Would you like to delete this ticket?</div>
            <PrimaryButton type="submit">Delete</PrimaryButton>
         </form>
      </div>
   );
};

export default DeleteTicket;
