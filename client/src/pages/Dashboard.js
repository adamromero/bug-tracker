import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, deleteProject } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import TrackerList from "../styles/TrackerList";
import TrackerListItem from "../styles/TrackerListItem";
import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";

import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";

import Modal from "../components/Modal";
import CreateProject from "../components/forms/CreateProject";
import UpdateProject from "../components/forms/UpdateProject";
import DeleteProject from "../components/forms/DeleteProject";

function Dashboard() {
   const [isUpdated, setIsUpdated] = useState(false);
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

      dispatch(getProjects());
   }, [user, isError, message, dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   console.log("render: ");

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
                     <div>{project.title}</div>
                     <div>{project.description}</div>
                     <div>
                        {project.teamMembers.map((user) => (
                           <div key={user._id}>{user.name}</div>
                        ))}
                     </div>
                  </Link>
                  <div>
                     <Modal
                        button={
                           <SecondaryButton>
                              <MdModeEditOutline />
                           </SecondaryButton>
                        }
                     >
                        <UpdateProject project={project} />
                     </Modal>
                     <Modal
                        button={
                           <SecondaryButton>
                              <MdDelete />
                           </SecondaryButton>
                        }
                     >
                        <DeleteProject id={project._id} />
                     </Modal>
                  </div>
               </TrackerListItem>
            ))}
         </TrackerList>
         <div>
            <PrimaryButton>1</PrimaryButton>
            <PrimaryButton>2</PrimaryButton>
            <PrimaryButton>3</PrimaryButton>
         </div>
      </>
   );
}

export default Dashboard;
