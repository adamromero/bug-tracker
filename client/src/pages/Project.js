import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import Ticket from "./Ticket";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const Project = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const { projects, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      dispatch(getProject(id));
   }, [dispatch]);

   const handleNewTicket = (e) => {
      e.preventDefault();
      console.log("new ticket");
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
                     <input type="text" placeholder="Title" />
                     <br />
                     <label htmlFor="">Description</label>
                     <br />
                     <textarea placeholder="Description" />
                     <br />
                     <label htmlFor="">Time Estimate</label>
                     <br />
                     <input type="number" placeholder="Time estimate" />
                     <br />
                     <label htmlFor="">Assign team member</label>
                     <br />
                     <select name="" id="">
                        <option value="">Select a team member</option>
                        <option value="">Adam Romero</option>
                        <option value="">John Doe</option>
                     </select>
                     <br />
                     <label htmlFor="">Priority</label>
                     <br />
                     <select name="" id="">
                        <option value="">Low</option>
                        <option value="">Medium</option>
                        <option value="">High</option>
                     </select>
                     <br />
                     <button type="submit">Submit</button>
                  </form>
               </div>
            )}
         </Popup>
         <h3>{projects.title}</h3>
         <p>{projects.description}</p>
         <h3>Tickets</h3>
         {projects.tickets && projects.tickets.length > 0 ? (
            <div>
               {projects.tickets.map((ticket) => (
                  <div key={ticket}>{ticket}</div>
               ))}
            </div>
         ) : (
            <div>No tickets</div>
         )}
      </div>
   );
};

export default Project;
