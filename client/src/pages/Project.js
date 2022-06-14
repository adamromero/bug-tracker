import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import { getProjectTickets } from "../features/tickets/ticketSlice";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";

import Modal from "../components/Modal";
import CreateTicket from "../components/forms/CreateTicket";
import UpdateTicket from "../components/forms/UpdateTicket";
import DeleteTicket from "../components/forms/DeleteTicket";

const Project = () => {
   const dispatch = useDispatch();
   const { id } = useParams();

   const { project, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   const { tickets } = useSelector((state) => state.tickets);

   useEffect(() => {
      dispatch(getProject(id));
      dispatch(getProjectTickets(id));
   }, [dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div>
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
            <Modal type="New">
               <CreateTicket project={project} />
            </Modal>
         </div>
         <h3>Tickets</h3>
         {tickets && tickets.length > 0 ? (
            <TrackerList>
               {tickets.map((ticket) => (
                  <TrackerListItem key={ticket._id}>
                     <Link to={`/ticket/${id}`} key={ticket._id} state={ticket}>
                        <h4>{ticket.title}</h4>
                        <p>{ticket.description}</p>
                        <p>{ticket.priority}</p>
                        <p>{ticket.status}</p>
                     </Link>
                     <Modal type="Edit">
                        <UpdateTicket project={project} ticket={ticket} />
                     </Modal>
                     <Modal type="Delete">
                        <DeleteTicket id={ticket._id} />
                     </Modal>
                  </TrackerListItem>
               ))}
            </TrackerList>
         ) : (
            <div>No tickets</div>
         )}
      </div>
   );
};

export default Project;
