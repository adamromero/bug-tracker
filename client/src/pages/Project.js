import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import PageStyle from "../styles/PageStyle";

import ProjectTickets from "../components/ProjectTickets";

const Project = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const { project, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );
   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (!user) {
         navigate("/login");
      }

      dispatch(getProject(id));
   }, [dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <div className="m-5">
         <div className="mb-5 border-b-[1px] border-slate-200">
            <div className="flex gap-4 items-center font-bold">
               <h2 className="text-2xl">Project</h2>
               <div>&gt;</div>
               <h2 className="text-2xl">{project.title}</h2>
            </div>
            <p className="my-5 text-lg italic">{project.description}</p>
            {project.teamMembers && project.teamMembers.length > 0 ? (
               <div>
                  <div className="mb-5">
                     <h4>Assigned To:</h4>
                     {project.teamMembers.map((member) => (
                        <p key={member._id}>{member.name}</p>
                     ))}
                  </div>
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
