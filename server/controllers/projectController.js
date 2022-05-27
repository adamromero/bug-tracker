import asyncHandler from "express-async-handler";
import Project from "../models/projectModel.js";

const getProjects = asyncHandler(async (req, res) => {
   const projects = await Project.find()
      .populate("teamMembers")
      .populate("tickets");
   res.status(200).json(projects);
});

const getProject = asyncHandler(async (req, res) => {
   const project = await Project.findById(req.params.id)
      .populate("teamMembers")
      .populate("tickets");
   res.status(200).json(project);
});

const createProject = asyncHandler(async (req, res) => {
   console.log("req.body: ", req.body);

   if (!req.body.title || !req.body.description) {
      res.status(400);
      throw new Error("Please provide a title and description");
   }

   const project = await Project.create(req.body);
   res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
   const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!project) {
      res.status(404);
      throw new Error("Project not found");
   }

   res.status(200).json(project);
});

const deleteProject = asyncHandler(async (req, res) => {
   const project = await Project.findById(req.params.id);
   if (!project) {
      res.status(404);
      throw new Error("Project not found");
   }
   await project.remove();
   res.status(200).json({ id: req.params.id });
});

export { getProjects, getProject, createProject, updateProject, deleteProject };
