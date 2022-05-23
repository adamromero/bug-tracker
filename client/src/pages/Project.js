import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProject } from "../features/projects/projectSlice";
import Ticket from "./Ticket";

const Project = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { id } = useParams();

   const { projects, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      dispatch(getProject(id));
   }, [dispatch]);

   console.log(projects);

   return (
      <div>
         <h2>Project</h2>
         <h3>{projects.title}</h3>
         <p>{projects.description}</p>
         <h3>Tickets</h3>
         {projects.tickets && projects.tickets.length > 0 ? (
            <div>
               {projects.tickets.map((ticket) => (
                  <div key={ticket}>{ticket}</div>
               ))}
            </div>
         ) : (
            <div>No tickets</div>
         )}
      </div>
   );
};

export default Project;
