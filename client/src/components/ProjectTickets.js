import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";

import UpdateTicket from "./forms/UpdateTicket";
import DeleteTicket from "./forms/DeleteTicket";
import CreateTicket from "./forms/CreateTicket";
import { getProjectTickets } from "../features/tickets/ticketSlice";

import Modal from "./Modal";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";
import Spinner from "../styles/Spinner";

import TicketMarker from "./TicketMarker";

const ProjectTickets = ({ project }) => {
   const [selectedPriority, setSelectedPriority] = useState("All");
   const [selectedStatus, setSelectedStatus] = useState("All");

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

   const filterPriority = (ticket) => {
      if (selectedPriority === "All") {
         return ticket;
      } else {
         return ticket.priority === selectedPriority;
      }
   };

   const filterStatus = (ticket) => {
      if (selectedStatus === "All") {
         return ticket;
      } else {
         return ticket.status === selectedStatus;
      }
   };

   const statusMarker = (status) => {
      if (status === "On Hold") {
         return <TicketMarker title="On Hold" color="bg-gray-500" />;
      } else if (status === "In Progress") {
         return <TicketMarker title="In Progress" color="bg-orange-500" />;
      } else if (status === "Completed") {
         return <TicketMarker title="Completed" color="bg-green-500" />;
      }
   };

   const priorityMarker = (priority) => {
      if (priority === "Low") {
         return <TicketMarker title="Low" color="bg-gray-500" />;
      } else if (priority === "Medium") {
         return <TicketMarker title="Medium" color="bg-orange-500" />;
      } else if (priority === "High") {
         return <TicketMarker title="High" color="bg-red-500" />;
      }
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
         <div className="flex gap-2 mb-3">
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
         <h3 className="text-lg font-bold mb-3">
            {handleTicketHeading(selectedPriority, selectedStatus)}
         </h3>
         {tickets
            .filter((ticket) => filterPriority(ticket))
            .filter((ticket) => filterStatus(ticket)).length ? (
            <table className="w-full border-collapse text-left mb-5">
               <thead>
                  <tr>
                     <th className="font-normal">Title</th>
                     <th className="font-normal">Description</th>
                  </tr>
               </thead>
               <tbody>
                  {tickets
                     .filter((ticket) => filterPriority(ticket))
                     .filter((ticket) => filterStatus(ticket))
                     .map((filteredTicket) => (
                        <tr
                           className="border-b-[1px] border-slate-200"
                           key={filteredTicket._id}
                           style={
                              filteredTicket.status === "Completed"
                                 ? {
                                      color: "#bbbbbb",
                                   }
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
                           <td>{statusMarker(filteredTicket.status)}</td>
                           <td>{priorityMarker(filteredTicket.priority)}</td>
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
         ) : (
            <h4>No tickets found</h4>
         )}
      </>
   );
};

export default ProjectTickets;
