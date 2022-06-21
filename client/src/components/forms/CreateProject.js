import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createProject } from "../../features/projects/projectSlice";
import { getUsers } from "../../features/users/allUsersSlice";

import { PrimaryButton } from "../../styles/Button";

const CreateProject = () => {
   const initialProjectDetails = {
      title: "",
      description: "",
      teamMembers: [],
   };
   const [projectDetails, setProjectDetails] = useState(initialProjectDetails);

   const dispatch = useDispatch();
   const { allUsers } = useSelector((state) => state.users);

   const handleNewProject = (e) => {
      e.preventDefault();
      dispatch(createProject(projectDetails));
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
         <div className="header">Create Project </div>
         <form onSubmit={handleNewProject}>
            <label htmlFor="">Title</label>
            <input
               type="text"
               placeholder="Title"
               name="title"
               onChange={handleOnChange}
            />
            <label htmlFor="">Description</label>
            <textarea
               name="description"
               placeholder="Description"
               rows="4"
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

export default CreateProject;
