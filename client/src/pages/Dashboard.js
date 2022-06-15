import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";
import PrimaryButton from "../styles/Button";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import Modal from "../components/Modal";
import CreateProject from "../components/forms/CreateProject";
import UpdateProject from "../components/forms/UpdateProject";
import DeleteProject from "../components/forms/DeleteProject";

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

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <h2>Dashboard</h2>
         <div>
            <h3>Projects</h3>
            <Modal button={<PrimaryButton>New Project</PrimaryButton>}>
               <CreateProject />
            </Modal>
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
                  <Modal
                     button={
                        <PrimaryButton>
                           <MdModeEditOutline />
                        </PrimaryButton>
                     }
                  >
                     <UpdateProject project={project} />
                  </Modal>
                  <Modal
                     button={
                        <PrimaryButton>
                           <MdDelete />
                        </PrimaryButton>
                     }
                  >
                     <DeleteProject id={project._id} />
                  </Modal>
               </TrackerListItem>
            ))}
         </TrackerList>
      </>
   );
}

export default Dashboard;
