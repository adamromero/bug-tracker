import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getProjects } from "../features/projects/projectSlice";

function Dashboard() {
   const dispatch = useDispatch();

   const { projects, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      dispatch(getProjects());
   }, [isError, message, dispatch]);

   return (
      <div>
         <main>
            <h2>Dashboard</h2>
            <h3>Projects</h3>
            {projects.length > 0 ? (
               <div>
                  {projects.map((project) => (
                     <Link to={`/project/${project._id}`} key={project._id}>
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                     </Link>
                  ))}
               </div>
            ) : (
               <div>No projects</div>
            )}
         </main>
      </div>
   );
}

export default Dashboard;
