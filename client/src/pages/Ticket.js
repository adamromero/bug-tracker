import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/tickets/ticketSlice";

const Ticket = () => {
   const { id } = useParams();
   const dispatch = useDispatch();

   const { ticket, isLoading, isError, message } = useSelector(
      (state) => state.tickets
   );

   console.log(ticket);

   useEffect(() => {
      dispatch(getTicket(id));
   }, [dispatch]);

   return (
      <div>
         <h2>Ticket</h2>
         <p>{ticket.description}</p>
         <p>{ticket.priority}</p>
         <p>{ticket.status}</p>
      </div>
   );
};

export default Ticket;
