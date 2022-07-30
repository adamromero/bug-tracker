import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects } from "../features/projects/projectSlice";

import Spinner from "../styles/Spinner";
import { PrimaryButton } from "../styles/Button";
import { SecondaryButton } from "../styles/Button";
import PageStyle from "../styles/PageStyle";

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
      <div className="m-5">
         <h2 className="text-2xl	font-bold">Dashboard</h2>
         <div className="flex justify-between items-center mb-5 py-5 border-b-[1px] border-slate-200">
            <h3 className="text-xl">Projects</h3>
            <Modal button={<PrimaryButton>New Project</PrimaryButton>}>
               <CreateProject />
            </Modal>
         </div>
         <table className="w-full border-collapse text-left mb-5">
            <thead>
               <tr>
                  <th className="font-normal">Title</th>
                  <th className="font-normal">Description</th>
                  <th className="font-normal">Team</th>
               </tr>
            </thead>
            <tbody>
               {projects.map((project) => (
                  <tr
                     key={project._id}
                     className="border-b-[1px] border-slate-200"
                  >
                     <td className="text-[#087e8b]">
                        <Link to={`/project/${project._id}`} key={project._id}>
                           {project.title}
                        </Link>
                     </td>
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
      </div>
   );
}

export default Dashboard;
