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
         <div className="mb-5 pb-5 border-b-[1px] border-slate-200">
            <div className="flex gap-4 items-center">
               <h2 className="text-2xl	font-bold">Project</h2>
               <div>&gt;</div>
               <h2 className="text-2xl font-bold">{project.title}</h2>
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

                  <div className="flex gap-2">
                     <div className="flex flex-col">
                        <label htmlFor="status">Status</label>
                        <select
                           className="border-[1px] border-black"
                           name="ticketsByStatus"
                           id="status"
                        >
                           <option value="">All</option>
                           <option value="">On Hold</option>
                           <option value="">In Progress</option>
                           <option value="">Completed</option>
                        </select>
                     </div>
                     <div className="flex flex-col">
                        <label htmlFor="priority">Priority</label>
                        <select
                           className="border-[1px] border-black"
                           name="ticketsByPriority"
                           id="priority"
                        >
                           <option value="">All</option>
                           <option value="">Low</option>
                           <option value="">Medium</option>
                           <option value="">High</option>
                        </select>
                     </div>
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
