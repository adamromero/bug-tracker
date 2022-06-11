import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, createProject } from "../features/projects/projectSlice";
import { getUsers } from "../features/users/allUsersSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";
import PrimaryButton from "../styles/Button";
import ModalStyle from "../styles/ModalStyle";

import ProjectModal from "../components/ProjectModal";
import DeleteModal from "../components/DeleteModal";

function Dashboard() {
   const initialProjectDetails = {
      title: "",
      description: "",
      teamMembers: [],
   };
   const [projectDetails, setProjectDetails] = useState(initialProjectDetails);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const { user } = useSelector((state) => state.auth);
   const { projects, isLoading, isError, message } = useSelector(
      (state) => state.projects
   );
   const { allUsers } = useSelector((state) => state.users);

   useEffect(() => {
      if (!user) {
         navigate("/login");
      }

      return () => {
         dispatch(getProjects());
         dispatch(getUsers());
      };
   }, [isError, message, dispatch]);

   const handleNewProject = (e) => {
      e.preventDefault();
      dispatch(createProject(projectDetails));
   };

   const handleEditProject = (e) => {
      e.preventDefault();
      console.log(projectDetails);
      //dispatch(updateProject(projectDetails));
   };

   const handleDeleteProject = (e) => {
      console.log("delete project");
   };

   const handleOnChange = (e) => {
      const selectedOptions = e.target.selectedOptions;
      let selectedOptionsArray;
      if (selectedOptions) {
         selectedOptionsArray = Array.from(
            selectedOptions,
            (item) => item.value
         );
      }

      setProjectDetails((prevState) => ({
         ...prevState,
         [e.target.name]: e.target.value,
         teamMembers: selectedOptionsArray,
      }));
   };

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <h2>Dashboard</h2>
         <div>
            <h3>Projects</h3>
            <ProjectModal
               type="New"
               submitHandler={handleNewProject}
               changeHandler={handleOnChange}
            />
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
                  <ProjectModal
                     type="Edit"
                     onClick={handleEditProject}
                     changeHandler={handleOnChange}
                  />
                  <DeleteModal onClick={handleDeleteProject} />
               </TrackerListItem>
            ))}
         </TrackerList>
      </>
   );
}

export default Dashboard;
