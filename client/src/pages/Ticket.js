import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/tickets/ticketSlice";

import Comments from "../components/Comments";

import Spinner from "../styles/Spinner";

const Ticket = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const { ticket, isLoading, isError, isSuccess } = useSelector(
      (state) => state.tickets
   );

   useEffect(() => {
      dispatch(getTicket(id));
   }, [dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   console.log(ticket);

   return (
      <>
         <h2>Ticket</h2>
         {ticket ? (
            <div>
               <h3>{ticket.title}</h3>
               <h4>Description</h4>
               <p>{ticket.description}</p>
               <div
                  style={{
                     display: "flex",
                     justifyContent: "space-between",
                     maxWidth: "450px",
                  }}
               >
                  <div>
                     <h4>Priority</h4>
                     <p>{ticket.priority}</p>
                  </div>
                  <div>
                     <h4>Status</h4>
                     <p>{ticket.status}</p>
                  </div>
                  <div>
                     <h4>Estimate</h4>
                     <p>{ticket.estimate}</p>
                  </div>
               </div>
               <h4>Assigned to</h4>
               {ticket.teamMembers &&
                  ticket.teamMembers.map((member) => (
                     <p key={member._id}>{member.name}</p>
                  ))}
            </div>
         ) : (
            <div>No ticket found</div>
         )}

         <Comments ticketId={id} />
      </>
   );
};

export default Ticket;
