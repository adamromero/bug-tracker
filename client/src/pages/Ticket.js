import React, { useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProjectTickets } from "../features/tickets/ticketSlice";

const Ticket = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const location = useLocation();
   const data = location.state;

   // const { tickets, isLoading, isError, message } = useSelector(
   //    (state) => state.tickets
   // );

   //const ticket = tickets.filter((ticket) => ticket.project._id === id);
   console.log(data);
   useEffect(() => {
      //dispatch(getProjectTickets(id));
   }, [dispatch]);

   return (
      <div>
         <h2>Ticket</h2>
         <p>{data.description}</p>
         <p>{data.priority}</p>
         <p>{data.status}</p>
      </div>
   );
};

export default Ticket;
