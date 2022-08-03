import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicketsByUser } from "../features/tickets/ticketSlice";

const Tickets = () => {
   const { user } = useSelector((state) => state.auth);
   const { tickets } = useSelector((state) => state.tickets);

   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect(() => {
      if (!user) {
         navigate("/login");
      } else {
         dispatch(getTicketsByUser(user._id));
      }
   }, []);

   if (user) {
      return (
         <div className="m-5">
            <h2 className="text-2xl	font-bold pb-5 mb-5 border-b-[1px] border-slate-200">
               Tickets
            </h2>
            {tickets.length > 0 ? (
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
                        <th className="font-normal">Title</th>
                        <th className="font-normal">Description</th>
                        {/* <th>Estimate (hours)</th>
                     <th>Priority</th>
                     <th>Status</th> */}
                     </tr>
                  </thead>
                  <tbody>
                     {tickets.map((ticket, index) => (
                        <tr
                           key={ticket._id}
                           className={`${
                              index % 2 === 0
                                 ? "bg-gray-100 dark:bg-[#3e3e3e]"
                                 : "bg-gray-200 dark:bg-black"
                           }`}
                        >
                           <td className="p-3 text-[#087e8b] dark:text-white">
                              <Link to={`/ticket/${ticket._id}`} state={ticket}>
                                 {ticket.title}
                              </Link>
                           </td>
                           <td className="p-3">{ticket.description}</td>
                           {/* <td className="py-2">{ticket.estimate}</td>
                        <td className="py-2">{ticket.priority}</td>
                        <td className="py-2">{ticket.status}</td> */}
                        </tr>
                     ))}
                  </tbody>
               </table>
            ) : (
               <p>You currently have no tickets assigned</p>
            )}
         </div>
      );
   } else {
      return null;
   }
};

export default Tickets;
