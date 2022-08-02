import React from "react";
import { useDispatch } from "react-redux";
import { deleteProject } from "../../features/projects/projectSlice";
import {
   useUserValidation,
   userValidationMessage,
} from "../../utils/userValidation";

import { PrimaryButton } from "../../styles/Button";

const DeleteProject = (projectId) => {
   const dispatch = useDispatch();
   const isUserAuthorized = useUserValidation();

   const handleDeleteProject = (e) => {
      e.preventDefault();

      if (isUserAuthorized) {
         dispatch(deleteProject(projectId.id));
      }
   };

   return (
      <>
         <p>Would you like to delete this project?</p>
         {userValidationMessage(isUserAuthorized)}
         <form onSubmit={handleDeleteProject}>
            <PrimaryButton type="submit" disabled={!isUserAuthorized}>
               Delete
            </PrimaryButton>
         </form>
      </>
   );
};

export default DeleteProject;
