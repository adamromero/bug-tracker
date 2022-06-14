import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";

import ProjectModal from "../components/ProjectModal";
import DeleteModal from "../components/DeleteModal";

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

   const handleDeleteProject = (id) => {
      dispatch(deleteProject(id));
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <h2>Dashboard</h2>
         <div>
            <h3>Projects</h3>
            <ProjectModal type="New" />
         </div>
         <TrackerList>
            {projects.map((project) => (
               <TrackerListItem key={project._id}>
                  <Link to={`/project/${project._id}`} key={project._id}>
                     <h4>{project.title}</h4>
                     <p>{project.description}</p>
                     {project.teamMembers.map((user) => (
                        <span key={user._id}>{user.name}</span>
                     ))}
                  </Link>
                  <ProjectModal type="Edit" project={project} />
                  <DeleteModal
                     type="project"
                     id={project._id}
                     deleteHandler={handleDeleteProject}
                  />
               </TrackerListItem>
            ))}
         </TrackerList>
      </>
   );
}

export default Dashboard;
