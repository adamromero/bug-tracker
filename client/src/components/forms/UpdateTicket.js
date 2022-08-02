import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateTicket } from "../../features/tickets/ticketSlice";

import {
   useUserValidation,
   userValidationMessage,
} from "../../utils/userValidation";

import { PrimaryButton } from "../../styles/Button";

const UpdateTicket = ({ project, ticket }) => {
   const [ticketDetails, setTicketDetails] = useState(ticket);

   const dispatch = useDispatch();

   const isUserAuthorized = useUserValidation();

   const handleEditTicket = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(updateTicket(ticketDetails));
      }
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
         project: project._id,
         [e.target.name]: e.target.value,
         teamMembers: selectedOptionsArray
            ? selectedOptionsArray
            : prevState.teamMembers,
      }));
   };

   return (
      <>
         <h2> Update Ticket</h2>
         {userValidationMessage(isUserAuthorized)}
         <form className="flex flex-col" onSubmit={handleEditTicket}>
            <label>Title</label>
            <input
               type="text"
               name="title"
               placeholder="Title"
               value={ticketDetails.title || ""}
               onChange={handleOnChange}
            />
            <label>Description</label>
            <textarea
               placeholder="Description"
               name="description"
               rows="5"
               value={ticketDetails.description || ""}
               onChange={handleOnChange}
            />
            <label>Time Estimate</label>
            <input
               type="number"
               name="estimate"
               placeholder="Time estimate"
               value={ticketDetails.estimate || ""}
               onChange={handleOnChange}
            />
            <label>Assign team member</label>
            <select name="teamMembers" onChange={handleOnChange} multiple>
               <option value="">Select a team member</option>
               {project.teamMembers &&
                  project.teamMembers.map((user) => (
                     <option key={user._id} value={user._id}>
                        {user.name}
                     </option>
                  ))}
            </select>
            <label>Status</label>
            <select
               name="status"
               value={ticketDetails.status || ""}
               onChange={handleOnChange}
            >
               <option value="">Select a status</option>
               <option value="On Hold">On Hold</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
            </select>
            <label>Priority</label>
            <select
               name="priority"
               value={ticketDetails.priority || ""}
               onChange={handleOnChange}
            >
               <option value="">Select a priority</option>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>
            <PrimaryButton type="submit" disabled={!isUserAuthorized}>
               Submit
            </PrimaryButton>
         </form>
      </>
   );
};

export default UpdateTicket;
