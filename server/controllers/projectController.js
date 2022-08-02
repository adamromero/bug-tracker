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
   if (!req.body.title || !req.body.description || !req.body.teamMembers) {
      res.status(400);
      throw new Error("Please provide a title, description, and team members");
   }
   const project = await Project.create(req.body);
   res.status(200).json(project);
});

const updateProject = asyncHandler(async (req, res) => {
   const project = await Project.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true,
   }).then((project) => Project.findById(project._id).populate("teamMembers"));

   if (!project) {
      res.status(404);
      throw new Error("Project not found");
   }

   res.status(200).json(project);
});

const updateProjectTicket = asyncHandler(async (req, res) => {
   const project = await Project.findById(req.params.id);
   if (!project) {
      res.status(404);
      throw new Error("Project not found");
   }

   console.log("req.body: ", req.body);
   console.log("project: ", project);

   //project.tickets.push(req.body.ticketId);
   //await project.save();
   //res.status(200).json(project);
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

export {
   getProjects,
   getProject,
   createProject,
   updateProject,
   updateProjectTicket,
   deleteProject,
};
