import React from "react";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const TicketModal = ({ type }) => {
   return (
      <Modal button={type}>
         <div className="header"> {type} Ticket </div>
         <form>
            <label htmlFor="">Title</label>
            <input type="text" name="title" placeholder="Title" />
            <label htmlFor="">Description</label>
            <textarea placeholder="Description" name="description" />
            <label htmlFor="">Time Estimate</label>
            <input type="number" name="estimate" placeholder="Time estimate" />
            <label htmlFor="">Assign team member</label>
            <select name="teamMembers" id="" multiple>
               <option value="">Select a team member</option>
            </select>
            <label htmlFor="">Status</label>
            <select name="status" id="">
               <option value="">Select a status</option>
               <option value="On Hold">On Hold</option>
               <option value="In Progress">In Progress</option>
               <option value="Completed">Completed</option>
            </select>
            <label htmlFor="">Priority</label>
            <select name="priority" id="">
               <option value="">Select a priority</option>
               <option value="Low">Low</option>
               <option value="Medium">Medium</option>
               <option value="High">High</option>
            </select>
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </Modal>
   );
};

export default TicketModal;
