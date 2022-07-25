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
      <PageStyle>
         <div>
            <h2>Project</h2>
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            {project.teamMembers && project.teamMembers.length > 0 ? (
               <div>
                  <h4>Team Members</h4>
                  {project.teamMembers.map((member) => (
                     <p key={member._id}>{member.name}</p>
                  ))}
               </div>
            ) : (
               <p>No team members assigned</p>
            )}
         </div>
         <ProjectTickets project={project} />
      </PageStyle>
   );
};

export default Project;
