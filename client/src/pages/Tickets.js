import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsByUser } from "../features/tickets/ticketSlice";

const Tickets = () => {
   const { user } = useSelector((state) => state.auth);
   const { tickets } = useSelector((state) => state.tickets);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getTicketsByUser(user._id));
   }, []);

   return (
      <div>
         <h2>Tickets</h2>
         <div>
            {tickets.map((ticket) => (
               <Link
                  key={ticket._id}
                  to={`/ticket/${ticket._id}`}
                  state={ticket}
               >
                  {ticket.title} - {ticket.description} - {ticket.priority} -{" "}
                  {ticket.status}
                  <br />
               </Link>
            ))}
         </div>
      </div>
   );
};

export default Tickets;
