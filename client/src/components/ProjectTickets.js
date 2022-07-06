import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../styles/Button";
import Modal from "./Modal";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import UpdateTicket from "./forms/UpdateTicket";
import DeleteTicket from "./forms/DeleteTicket";

import {
   sortTicketsByPriorityAscending,
   sortTicketsByPriorityDescending,
} from "../utils/sortTicketsPriority";

import {
   sortTicketsByStatusAscending,
   sortTicketsByStatusDescending,
} from "../utils/sortTicketsStatus";
import { useEffect } from "react";

const ProjectTickets = ({ project }) => {
   const [priorityToggle, setPriorityToggle] = useState(false);
   const [statusToggle, setStatusToggle] = useState(false);
   const [tickets, setTickets] = useState([]);

   useEffect(() => {
      setTickets(project.tickets);
   }, [project.tickets]);

   const sortTicketsByPriority = () => {
      if (priorityToggle) {
         setTickets(sortTicketsByPriorityAscending(tickets));
      } else {
         setTickets(sortTicketsByPriorityDescending(tickets));
      }
      setPriorityToggle(!priorityToggle);
   };

   const sortTicketsByStatus = () => {
      if (statusToggle) {
         setTickets(sortTicketsByStatusAscending(tickets));
      } else {
         setTickets(sortTicketsByStatusDescending(tickets));
      }
      setStatusToggle(!statusToggle);
   };

   return (
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
               <th
                  onClick={() => sortTicketsByPriority()}
                  style={{ display: "inline-flex", cursor: "pointer" }}
               >
                  Priority{" "}
                  {priorityToggle ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
               </th>
               <th
                  onClick={() => sortTicketsByStatus()}
                  style={{ cursor: "pointer" }}
               >
                  Status
                  {statusToggle ? <FaArrowCircleDown /> : <FaArrowCircleUp />}
               </th>
            </tr>
         </thead>
         <tbody>
            {tickets.map((ticket) => (
               <tr key={ticket._id}>
                  <td>
                     <Link
                        to={`/ticket/${ticket._id}`}
                        key={ticket._id}
                        state={ticket}
                     >
                        {ticket.title}
                     </Link>
                  </td>
                  <td>{ticket.description}</td>
                  <td>{ticket.priority}</td>
                  <td>{ticket.status}</td>
                  <td>
                     <Modal
                        button={
                           <SecondaryButton>
                              <MdModeEditOutline />
                           </SecondaryButton>
                        }
                     >
                        <UpdateTicket project={project} ticket={ticket} />
                     </Modal>
                  </td>
                  <td>
                     <Modal
                        button={
                           <SecondaryButton>
                              <MdDelete />
                           </SecondaryButton>
                        }
                     >
                        <DeleteTicket id={ticket._id} />
                     </Modal>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   );
};

export default ProjectTickets;
