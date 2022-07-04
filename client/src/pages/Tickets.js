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
      <>
         <h2>Tickets</h2>
         <table
            style={{
               width: "100%",
               textAlign: "left",
               borderCollapse: "collapse",
               marginBottom: "20px",
            }}
         >
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Priority</th>
                  <th>Status</th>
               </tr>
            </thead>
            <tbody>
               {tickets.map((ticket) => (
                  <tr key={ticket._id}>
                     <td>
                        <Link to={`/ticket/${ticket._id}`} state={ticket}>
                           {ticket.title}
                        </Link>
                     </td>
                     <td>{ticket.description}</td>
                     <td>{ticket.priority}</td>
                     <td>{ticket.status}</td>
                  </tr>
               ))}
            </tbody>
         </table>
      </>
   );
};

export default Tickets;
