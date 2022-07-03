import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../features/projects/projectSlice";

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

import Chart from "../components/Chart";

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

      dispatch(getProjects());
   }, [user, isError, message, dispatch]);

   if (isLoading) {
      return <Spinner />;
   }

   return (
      <>
         <h2>Dashboard</h2>
         <div
            style={{
               display: "flex",
               justifyContent: "space-between",
               alignItems: "center",
            }}
         >
            <h3>Projects</h3>
            <Modal button={<PrimaryButton>New Project</PrimaryButton>}>
               <CreateProject />
            </Modal>
         </div>
         <table style={{ width: "100%", textAlign: "left" }}>
            <thead>
               <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Team</th>
               </tr>
            </thead>
            <tbody>
               {projects.map((project) => (
                  <tr key={project._id}>
                     <th>
                        <Link to={`/project/${project._id}`} key={project._id}>
                           <td>{project.title}</td>
                        </Link>
                     </th>

                     <td>{project.description}</td>
                     <td>
                        {project.teamMembers.map((user) => (
                           <div key={user._id}>{user.name}</div>
                        ))}
                     </td>
                     <td>
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
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
         <div>
            <PrimaryButton>1</PrimaryButton>
            <PrimaryButton>2</PrimaryButton>
            <PrimaryButton>3</PrimaryButton>
         </div>
         <Chart />
      </>
   );
}

export default Dashboard;
