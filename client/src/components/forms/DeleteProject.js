import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../features/projects/projectSlice";

import { PrimaryButton } from "../../styles/Button";

const DeleteProject = (projectId) => {
   const dispatch = useDispatch();

   const handleDeleteProject = (e) => {
      e.preventDefault();
      dispatch(deleteProject(projectId.id));
   };

   return (
      <>
         <p>Would you like to delete this project?</p>
         <form onSubmit={handleDeleteProject}>
            <PrimaryButton type="submit">Delete</PrimaryButton>
         </form>
      </>
   );
};

export default DeleteProject;
