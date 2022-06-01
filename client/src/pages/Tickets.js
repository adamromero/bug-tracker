import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTickets } from "../features/tickets/ticketSlice";

const Tickets = () => {
   const { user } = useSelector((state) => state.auth);
   const { tickets } = useSelector((state) => state.tickets);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTickets());
   }, [tickets]);

   return (
      <div>
         <h2>Tickets</h2>

         <p>{user.name}'s tickets</p>
         <p>{user.isAdmin ? "Administrator" : "Non-Administrator"}</p>
         <p>
            {tickets.map((ticket) => (
               <li key={ticket._id}>
                  {ticket.title} - {ticket.description}
               </li>
            ))}
         </p>
      </div>
   );
};

export default Tickets;
