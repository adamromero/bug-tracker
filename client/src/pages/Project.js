import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import Ticket from "./Ticket";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Project = () => {
   const initialTicketDetails = {
      title: "",
      description: "",
      estimate: 0,
      teamMembers: [],
      status: "",
      priority: "",
   };
   const [ticketDetails, setTicketDetails] = useState(initialTicketDetails);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const { project, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      dispatch(getProject(id));
   }, [dispatch]);

   const handleNewTicket = (e) => {
      e.preventDefault();
      console.log(ticketDetails);
   };

   const handleOnChange = (e) => {
      setTicketDetails({
         ...ticketDetails,
         [e.target.name]: e.target.value,
      });
   };

   return (
      <div>
         <h2>Project</h2>
         <Popup trigger={<button>New Ticket</button>} modal nested>
            {(close) => (
               <div className="modal">
                  <button className="close" onClick={close}>
                     &times;
                  </button>
                  <div className="header"> New Ticket </div>
                  <form onSubmit={handleNewTicket}>
                     <label htmlFor="">Title</label>
                     <br />
                     <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleOnChange}
                     />
                     <br />
                     <label htmlFor="">Description</label>
                     <br />
                     <textarea
                        placeholder="Description"
                        name="description"
                        onChange={handleOnChange}
                     />
                     <br />
                     <label htmlFor="">Time Estimate</label>
                     <br />
                     <input
                        type="number"
                        name="estimate"
                        placeholder="Time estimate"
                        onChange={handleOnChange}
                     />
                     <br />
                     <label htmlFor="">Assign team member</label>
                     <br />
                     <select
                        name="teamMembers"
                        id=""
                        onChange={handleOnChange}
                        multiple
                     >
                        <option value="">Select a team member</option>
                        <option value="Adam Romero">Adam Romero</option>
                        <option value="John Doe">John Doe</option>
                     </select>
                     <br />
                     <label htmlFor="">Status</label>
                     <br />
                     <select name="status" id="" onChange={handleOnChange}>
                        <option value="">Select a status</option>
                        <option value="On Hold">On Hold</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                     </select>
                     <br />
                     <label htmlFor="">Priority</label>
                     <br />
                     <select name="priority" id="" onChange={handleOnChange}>
                        <option value="">Select a priority</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                     </select>
                     <br />
                     <button type="submit">Submit</button>
                  </form>
               </div>
            )}
         </Popup>
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
         {project.tickets && project.tickets.length > 0 ? (
            <div>
               {project.tickets.map((ticket) => (
                  <div key={ticket._id}>
                     <h4>{ticket.title}</h4>
                     <p>{ticket.description}</p>
                     <p>{ticket.priority}</p>
                     <p>{ticket.status}</p>
                  </div>
               ))}
            </div>
         ) : (
            <div>No tickets</div>
         )}
      </div>
   );
};

export default Project;
