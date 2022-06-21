import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProject } from "../../features/projects/projectSlice";
import { getUsers } from "../../features/users/allUsersSlice";

import { PrimaryButton } from "../../styles/Button";

const UpdateProject = ({ project }) => {
   const [projectDetails, setProjectDetails] = useState(project);

   const dispatch = useDispatch();
   const { allUsers } = useSelector((state) => state.users);

   const handleEditProject = (e) => {
      e.preventDefault();
      dispatch(updateProject(projectDetails));
   };

   const handleOnChange = (e) => {
      const selectedOptions = e.target.selectedOptions;
      let selectedOptionsArray;
      if (selectedOptions) {
         selectedOptionsArray = Array.from(
            selectedOptions,
            (item) => item.value
         );
      }

      setProjectDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
         teamMembers: selectedOptionsArray,
      }));
   };

   useEffect(() => {
      dispatch(getUsers());
   }, [dispatch]);

   return (
      <div>
         <div className="header">Update Project </div>
         <form onSubmit={handleEditProject}>
            <label htmlFor="">Title</label>
            <input
               type="text"
               placeholder="Title"
               name="title"
               value={projectDetails.title || ""}
               onChange={handleOnChange}
            />
            <label htmlFor="">Description</label>
            <textarea
               name="description"
               placeholder="Description"
               rows="4"
               value={projectDetails.description || ""}
               onChange={handleOnChange}
            />
            <label htmlFor="">Assign team member</label>
            <select name="teamMembers" id="" multiple onChange={handleOnChange}>
               <option value="">Select a team member</option>
               {allUsers.map((user) => (
                  <option key={user._id} value={user._id}>
                     {user.name}
                  </option>
               ))}
            </select>
            <PrimaryButton type="submit">Submit</PrimaryButton>
         </form>
      </div>
   );
};

export default UpdateProject;
