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
   const [selectedPriority, setSelectedPriority] = useState("");
   const [selectedStatus, setSelectedStatus] = useState("");

   const dispatch = useDispatch();
   const { id } = useParams();

   const { tickets, isLoading, isError, isSuccess } = useSelector(
      (state) => state.tickets
   );

   const handlePriorityChange = (e) => {
      setSelectedPriority(e.target.value);
   };

   const handleStatusChange = (e) => {
      setSelectedStatus(e.target.value);
   };

   const handleTicketHeading = (selectedPriority, selectedStatus) => {
      let heading = "";
      if (selectedPriority === "All" && selectedStatus === "All") {
         heading = `${selectedStatus} Tickets`;
      } else {
         heading = `${selectedPriority} Priority ${selectedStatus} Tickets`;
      }

      return heading;
   };

   useEffect(() => {
      dispatch(getProjectTickets(id));
   }, [dispatch, selectedPriority, selectedStatus]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">Tickets</h3>
            <Modal button={<PrimaryButton>New Ticket</PrimaryButton>}>
               <CreateTicket project={project} />
            </Modal>
         </div>
         <div className="flex gap-2">
            <div className="flex flex-col">
               <label htmlFor="status">Status</label>
               <select
                  className="border-[1px] border-black"
                  name="ticketsByStatus"
                  id="status"
                  onChange={handleStatusChange}
                  value={selectedStatus}
               >
                  <option value="All">All</option>
                  <option value="On Hold">On Hold</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
               </select>
            </div>
            <div className="flex flex-col">
               <label htmlFor="priority">Priority</label>
               <select
                  className="border-[1px] border-black"
                  name="ticketsByPriority"
                  id="priority"
                  onChange={handlePriorityChange}
                  value={selectedPriority}
               >
                  <option value="All">All</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
               </select>
            </div>
         </div>
         <h3 className="text-lg font-bold">
            {handleTicketHeading(selectedPriority, selectedStatus)}
         </h3>
         <table className="w-full border-collapse text-left mb-5">
            <thead>
               <tr>
                  <th className="font-normal">Title</th>
                  <th className="font-normal">Description</th>
               </tr>
            </thead>
            <tbody>
               {tickets
                  .filter((ticket) => {
                     if (selectedStatus === "All" && selectedPriority === "All")
                        return ticket;
                     if (
                        ticket.status === selectedStatus &&
                        ticket.priority === selectedPriority
                     )
                        return ticket;
                  })
                  .map((filteredTicket) => (
                     <tr
                        className="border-b-[1px] border-slate-200"
                        key={filteredTicket._id}
                        style={
                           filteredTicket.status === "Completed"
                              ? { color: "#bbbbbb" }
                              : null
                        }
                     >
                        <td className="text-[#087e8b]">
                           <Link
                              to={`/ticket/${filteredTicket._id}`}
                              key={filteredTicket._id}
                           >
                              {filteredTicket.title}
                           </Link>
                        </td>
                        <td>{filteredTicket.description}</td>
                        <td>
                           <Modal
                              button={
                                 <SecondaryButton>
                                    <MdModeEditOutline />
                                 </SecondaryButton>
                              }
                           >
                              <UpdateTicket
                                 project={project}
                                 ticket={filteredTicket}
                              />
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
                              <DeleteTicket id={filteredTicket._id} />
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
