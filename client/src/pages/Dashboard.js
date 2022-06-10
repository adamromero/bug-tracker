import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProjects, createProject } from "../features/projects/projectSlice";
import { getUsers } from "../features/users/allUsersSlice";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

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
      console.log(projectDetails);
      dispatch(createProject(projectDetails));
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

   return (
      <>
         <main>
            <h2>Dashboard</h2>
            <h3>Projects</h3>
            <Popup trigger={<button>New Project</button>} modal nested>
               {(close) => (
                  <div className="modal">
                     <button className="close" onClick={close}>
                        &times;
                     </button>
                     <div className="header"> New Project </div>
                     <form onSubmit={handleNewProject}>
                        <label htmlFor="">Title</label>
                        <br />
                        <input
                           type="text"
                           placeholder="Title"
                           name="title"
                           onChange={handleOnChange}
                        />
                        <br />
                        <label htmlFor="">Description</label>
                        <br />
                        <textarea
                           name="description"
                           placeholder="Description"
                           onChange={handleOnChange}
                        />
                        <br />
                        <label htmlFor="">Assign team member</label>
                        <br />
                        <select
                           name="teamMembers"
                           id=""
                           onChange={handleOnChange}
                           multiple
                        >
                           <option value="">Select a team member</option>
                           {allUsers.map((user) => (
                              <option key={user._id} value={user._id}>
                                 {user.name}
                              </option>
                           ))}
                        </select>
                        <br />
                        <button type="submit">Submit</button>
                     </form>
                  </div>
               )}
            </Popup>
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
      </>
   );
}

export default Dashboard;
