import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import PageStyle from "../styles/PageStyle";

import ProjectTickets from "../components/ProjectTickets";

const Project = () => {
   const dispatch = useDispatch();
   const { id } = useParams();

   const { project, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      dispatch(getProject(id));
   }, [dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div className="m-5">
         <div>
            <div className="flex gap-4 items-center">
               <h2 className="text-2xl	font-bold">Project</h2>
               <div>&gt;</div>
               <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>

            <p className="my-5 text-lg italic">{project.description}</p>
            {project.teamMembers && project.teamMembers.length > 0 ? (
               <div>
                  <h4>Assigned To</h4>
                  {project.teamMembers.map((member) => (
                     <p key={member._id}>{member.name}</p>
                  ))}
               </div>
            ) : (
               <p>No team members assigned</p>
            )}
         </div>
         <ProjectTickets project={project} />
      </div>
   );
};

export default Project;
