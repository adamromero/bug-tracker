import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import {
   createTicket,
   getProjectTickets,
   deleteTicket,
} from "../features/tickets/ticketSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";
import PrimaryButton from "../styles/Button";
import ModalStyle from "../styles/ModalStyle";
import TicketModal from "../components/TicketModal";
import DeleteModal from "../components/DeleteModal";

const Project = () => {
   const initialTicketDetails = {
      title: "",
      description: "",
      estimate: 0,
      teamMembers: [],
      project: "",
      status: "",
      priority: "",
   };
   const [ticketDetails, setTicketDetails] = useState(initialTicketDetails);
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

   const handleNewTicket = (e) => {
      e.preventDefault();
      dispatch(createTicket(ticketDetails));
   };

   const handleDeleteTicket = (id) => {
      dispatch(deleteTicket(id));
   };

   const handleOnChange = (e) => {
      let selectedOptionsArray;

      const selectedOptions = e.target.selectedOptions;
      if (selectedOptions && e.target.name === "teamMembers") {
         selectedOptionsArray = Array.from(
            selectedOptions,
            (item) => item.value
         );
      }

      setTicketDetails((prevState) => ({
         ...prevState,
         project: id,
         [e.target.name]: e.target.value,
         teamMembers: selectedOptionsArray
            ? selectedOptionsArray
            : prevState.teamMembers,
      }));
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div>
         <div>
            <h2>Project</h2>
            <Popup
               trigger={<PrimaryButton>New Ticket</PrimaryButton>}
               modal
               nested
            >
               {(close) => (
                  <ModalStyle className="modal">
                     <button className="close" onClick={close}>
                        &times;
                     </button>
                     <div className="header"> New Ticket </div>
                     <form onSubmit={handleNewTicket}>
                        <label htmlFor="">Title</label>
                        <input
                           type="text"
                           name="title"
                           placeholder="Title"
                           onChange={handleOnChange}
                        />
                        <label htmlFor="">Description</label>
                        <textarea
                           placeholder="Description"
                           name="description"
                           onChange={handleOnChange}
                        />
                        <label htmlFor="">Time Estimate</label>
                        <input
                           type="number"
                           name="estimate"
                           placeholder="Time estimate"
                           onChange={handleOnChange}
                        />
                        <label htmlFor="">Assign team member</label>
                        <select
                           name="teamMembers"
                           id=""
                           onChange={handleOnChange}
                           multiple
                        >
                           <option value="">Select a team member</option>
                           {project.teamMembers &&
                              project.teamMembers.map((member) => (
                                 <option key={member._id} value={member._id}>
                                    {member.name}
                                 </option>
                              ))}
                        </select>
                        <label htmlFor="">Status</label>
                        <select name="status" id="" onChange={handleOnChange}>
                           <option value="">Select a status</option>
                           <option value="On Hold">On Hold</option>
                           <option value="In Progress">In Progress</option>
                           <option value="Completed">Completed</option>
                        </select>
                        <label htmlFor="">Priority</label>
                        <select name="priority" id="" onChange={handleOnChange}>
                           <option value="">Select a priority</option>
                           <option value="Low">Low</option>
                           <option value="Medium">Medium</option>
                           <option value="High">High</option>
                        </select>
                        <PrimaryButton type="submit">Submit</PrimaryButton>
                     </form>
                  </ModalStyle>
               )}
            </Popup>
         </div>
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
                     <TicketModal type="Edit" />
                     <DeleteModal
                        type="ticket"
                        id={ticket._id}
                        deleteHandler={handleDeleteTicket}
                     />
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
