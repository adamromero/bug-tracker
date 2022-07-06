import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import { getProjectTickets } from "../features/tickets/ticketSlice";

import Spinner from "../styles/Spinner";
import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import Modal from "../components/Modal";
import CreateTicket from "../components/forms/CreateTicket";
import UpdateTicket from "../components/forms/UpdateTicket";
import DeleteTicket from "../components/forms/DeleteTicket";
import {
   sortTicketsByPriorityAscending,
   sortTicketsByPriorityDescending,
} from "../utils/sortTicketsPriority";

import {
   sortTicketsByStatusAscending,
   sortTicketsByStatusDescending,
} from "../utils/sortTicketsStatus";

const Project = () => {
   const [priorityToggle, setPriorityToggle] = useState(false);
   const [statusToggle, setStatusToggle] = useState(false);
   const [ticketsState, setTicketsState] = useState([]);
   const dispatch = useDispatch();
   const { id } = useParams();

   const { project } = useSelector((state) => state.projects);

   const { tickets, isLoading, isError, message } = useSelector(
      (state) => state.tickets
   );

   useEffect(() => {
      dispatch(getProject(id));
      dispatch(getProjectTickets(id));
      setTicketsState(tickets);
   }, [dispatch]);

   const sortTicketsByPriority = () => {
      if (priorityToggle) {
         setTicketsState(sortTicketsByPriorityAscending(ticketsState));
      } else {
         setTicketsState(sortTicketsByPriorityDescending(ticketsState));
      }
      setPriorityToggle(!priorityToggle);
   };

   const sortTicketsByStatus = () => {
      if (statusToggle) {
         setTicketsState(sortTicketsByStatusAscending(ticketsState));
      } else {
         setTicketsState(sortTicketsByStatusDescending(ticketsState));
      }
      setStatusToggle(!statusToggle);
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <div>
            <h2>Project</h2>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.teamMembers && project.teamMembers.length > 0 ? (
               <div>
                  <h4>Team Members</h4>
                  {project.teamMembers.map((member) => (
                     <p key={member._id}>{member.name}</p>
                  ))}
               </div>
            ) : (
               <p>No team members assigned</p>
            )}
         </div>
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h3>Tickets</h3>
            <Modal button={<PrimaryButton>New Ticket</PrimaryButton>}>
               <CreateTicket project={project} />
            </Modal>
         </div>
         {tickets && tickets.length > 0 ? (
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
                        {priorityToggle ? (
                           <FaArrowCircleDown />
                        ) : (
                           <FaArrowCircleUp />
                        )}
                     </th>
                     <th
                        onClick={() => sortTicketsByStatus()}
                        style={{ cursor: "pointer" }}
                     >
                        Status
                        {statusToggle ? (
                           <FaArrowCircleDown />
                        ) : (
                           <FaArrowCircleUp />
                        )}
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {ticketsState.map((ticket) => (
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
         ) : (
            <div>No tickets</div>
         )}
      </>
   );
};

export default Project;
