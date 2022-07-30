import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/tickets/ticketSlice";

import Comments from "../components/Comments";

import Spinner from "../styles/Spinner";
import PageStyle from "../styles/PageStyle";

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

   return (
      <div className="m-5">
         <div className="flex gap-4 items-center">
            <h2 className="text-2xl	font-bold">Ticket</h2>
            <div>&gt;</div>
            <h2 className="text-2xl font-bold">{ticket && ticket.title}</h2>
         </div>

         {ticket ? (
            <div>
               <p className="my-5 text-lg italic">{ticket.description}</p>
               <div className="flex justify-between max-w-lg mb-5">
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
                  {ticket.createdBy ? (
                     <div>
                        <h4>Created By</h4>
                        <p>{ticket.createdBy.name}</p>
                     </div>
                  ) : null}
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
      </div>
   );
};

export default Ticket;
