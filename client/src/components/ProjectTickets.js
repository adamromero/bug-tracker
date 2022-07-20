import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";
import Modal from "./Modal";

import { useSelector, useDispatch } from "react-redux";

import { getProjectTickets } from "../features/tickets/ticketSlice";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";

import UpdateTicket from "./forms/UpdateTicket";
import DeleteTicket from "./forms/DeleteTicket";
import CreateTicket from "./forms/CreateTicket";

import Spinner from "../styles/Spinner";

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

   const dispatch = useDispatch();
   const { id } = useParams();

   const { tickets, isLoading, isError, isSuccess } = useSelector(
      (state) => state.tickets
   );

   // const [displayTickets, setDisplayTickets] = useState(
   //    JSON.parse(localStorage.getItem("tickets"))
   //       ? JSON.parse(localStorage.getItem("tickets"))
   //       : tickets
   // );

   useEffect(() => {
      dispatch(getProjectTickets(id));
      // setDisplayTickets(
      //    JSON.parse(localStorage.getItem("tickets"))
      //       ? JSON.parse(localStorage.getItem("tickets"))
      //       : tickets
      // );

      // return () => {
      //    localStorage.removeItem("tickets");
      // };
   }, [dispatch]);

   //console.log("tickets: ", tickets);
   //console.log("displaytickets: ", displayTickets);

   const sortTicketsByPriority = () => {
      let sortedTickets;
      if (priorityToggle) {
         //sortedTickets = sortTicketsByPriorityAscending(displayTickets);
      } else {
         //sortedTickets = sortTicketsByPriorityDescending(displayTickets);
      }
      localStorage.setItem("tickets", JSON.stringify(sortedTickets));
      //setDisplayTickets(sortedTickets);
      setPriorityToggle(!priorityToggle);
   };

   const sortTicketsByStatus = () => {
      let sortedTickets;
      if (statusToggle) {
         //sortedTickets = sortTicketsByStatusAscending(displayTickets);
      } else {
         // sortedTickets = sortTicketsByStatusDescending(displayTickets);
      }
      localStorage.setItem("tickets", JSON.stringify(sortedTickets));
      //setDisplayTickets(sortedTickets);
      setStatusToggle(!statusToggle);
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
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
                  <th>Estimate (hours)</th>
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
               {tickets.map((ticket) => (
                  <tr
                     key={ticket._id}
                     style={
                        ticket.status === "Completed"
                           ? { color: "#bbbbbb" }
                           : null
                     }
                  >
                     <td>
                        <Link to={`/ticket/${ticket._id}`} key={ticket._id}>
                           {ticket.title}
                        </Link>
                     </td>
                     <td>{ticket.description}</td>
                     <td>{ticket.estimate}</td>
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
      </>
   );
};

export default ProjectTickets;
