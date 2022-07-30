import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createTicket } from "../../features/tickets/ticketSlice";

import { PrimaryButton } from "../../styles/Button";

const CreateTicket = ({ project }) => {
   const initialTicketDetails = {
      title: "",
      description: "",
      estimate: "",
      teamMembers: [],
      status: "",
      priority: "",
      project: project._id,
      createdBy: "",
   };
   const [ticketDetails, setTicketDetails] = useState(initialTicketDetails);

   const dispatch = useDispatch();

   const { user } = useSelector((state) => state.auth);

   const handleNewTicket = (e) => {
      e.preventDefault();
      dispatch(createTicket(ticketDetails));
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
         [e.target.name]: e.target.value,
         teamMembers: selectedOptionsArray
            ? selectedOptionsArray
            : prevState.teamMembers,
         createdBy: user._id,
      }));
   };

   return (
      <>
         <h2>Create Ticket</h2>
         <form className="flex flex-col" onSubmit={handleNewTicket}>
            <label htmlFor="">Title</label>
            <input
               type="text"
               name="title"
               placeholder="Title"
               onChange={handleOnChange}
            />
            <label htmlFor="">Description</label>
            <textarea
               name="description"
               placeholder="Description"
               rows="5"
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
            <select name="teamMembers" multiple>
               <option value="">Select a team member</option>
               {project.teamMembers.map((user) => (
                  <option key={user._id} value={user._id}>
                     {user.name}
                  </option>
               ))}
            </select>
            <label htmlFor="">Status</label>
            <select name="status" onChange={handleOnChange}>
               <option value="">Select a status</option>
               <option value="On Hold">On Hold</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
            </select>
            <label htmlFor="">Priority</label>
            <select name="priority" onChange={handleOnChange}>
               <option value="">Select a priority</option>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </>
   );
};

export default CreateTicket;
