import axios from "axios";

const getProjects = async () => {
   const response = await axios.get("/api/project");
   return response.data;
};

const getProject = async (id) => {
   const response = await axios.get(`/api/project/${id}`);
   return response.data;
};

const createProject = async (project) => {
   const response = await axios.post("/api/project", project);
   return response.data;
};

const updateProject = async (project) => {
   const response = await axios.put(`/api/project/${project.id}`, project);
   return response.data;
};

const deleteProject = async (id) => {
   const response = await axios.delete(`/api/project/${id}`);
   return response.data;
};

const projectService = {
   getProjects,
   getProject,
   createProject,
   updateProject,
   deleteProject,
};

export default projectService;
