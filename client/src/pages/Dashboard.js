import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../features/projects/projectSlice";

function Dashboard() {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user } = useSelector((state) => state.auth);
   const { projects, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );

   useEffect(() => {
      if (!user) {
         navigate("/login");
      }

      return () => {
         dispatch(getProjects());
      };
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
