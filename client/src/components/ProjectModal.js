import React from "react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import PrimaryButton from "../styles/Button";

const ProjectModal = ({ type, submitHandler, changeHandler }) => {
   const { allUsers } = useSelector((state) => state.users);

   return (
      <Modal button={type}>
         <div className="header">{type} Project </div>
         <form onSubmit={submitHandler}>
            <label htmlFor="">Title</label>
            <input
               type="text"
               placeholder="Title"
               name="title"
               onChange={changeHandler}
            />
            <label htmlFor="">Description</label>
            <textarea
               name="description"
               placeholder="Description"
               rows="4"
               onChange={changeHandler}
            />
            <label htmlFor="">Assign team member</label>
            <select name="teamMembers" id="" multiple onChange={changeHandler}>
               <option value="">Select a team member</option>
               {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                     {user.name}
                  </option>
               ))}
            </select>
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </Modal>
   );
};

export default ProjectModal;
