import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getTicket } from "../features/tickets/ticketSlice";
import { Link, useNavigate } from "react-router-dom";

import Comments from "../components/Comments";

import Spinner from "../styles/Spinner";

const Ticket = () => {
   const { id } = useParams();
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { user } = useSelector((state) => state.auth);
   const { ticket, isLoading, isError, isSuccess } = useSelector(
      (state) => state.tickets
   );

   useEffect(() => {
      if (!user) {
         console.log("No user logged in");
         navigate("/login");
      }

      dispatch(getTicket(id));
   }, [dispatch]);

   const priorityColor = (priority) => {
      switch (priority) {
         case "Low":
            return "bg-green-500";
         case "Medium":
            return "bg-orange-500";
         case "High":
            return "bg-red-500";
         default:
            return "bg-gray-500";
      }
   };

   const statusColor = (status) => {
      switch (status) {
         case "Open":
            return "bg-yellow-500";
         case "In Progress":
            return "bg-sky-400";
         case "Completed":
            return "bg-green-500";
         default:
            return "bg-gray-500";
      }
   };

   const estimateColor = (estimate) => {
      if (estimate > 6) {
         return "bg-red-500";
      } else if (estimate > 3) {
         return "bg-orange-500";
      } else {
         return "bg-green-500";
      }
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div className="m-5">
         <div className="flex gap-4 items-center font-bold">
            <h2 className="text-2xl">Ticket</h2>
            <div>&gt;</div>
            <h2 className="text-2xl">{ticket && ticket.title}</h2>
         </div>
         {/* {ticket ? (
            <Link to={`/project/${ticket.project._id}`}>
               {ticket.project.title}
            </Link>
         ) : null} */}

         {ticket ? (
            <div className="mb-5 pb-5 border-b-[1px] border-slate-200">
               <p className="my-5 text-lg italic">{ticket.description}</p>
               <div className="flex justify-between max-w-lg mb-5">
                  <div>
                     <h4>Priority:</h4>
                     <p
                        className={`${priorityColor(
                           ticket.priority
                        )} text-center text-white rounded px-2`}
                     >
                        {ticket.priority}
                     </p>
                  </div>
                  <div>
                     <h4>Status:</h4>
                     <p
                        className={`${statusColor(
                           ticket.status
                        )} text-center text-white rounded px-2`}
                     >
                        {ticket.status}
                     </p>
                  </div>
                  <div>
                     <h4>Estimate:</h4>
                     <p
                        className={`${estimateColor(
                           ticket.estimate
                        )}	text-center text-white rounded px-2`}
                     >
                        {ticket.estimate}
                     </p>
                  </div>
                  {ticket.createdBy ? (
                     <div>
                        <h4>Created By:</h4>
                        <p>{ticket.createdBy.name}</p>
                     </div>
                  ) : null}
               </div>
               <h4>Assigned to:</h4>
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
