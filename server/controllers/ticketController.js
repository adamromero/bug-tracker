import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";
import Project from "../models/projectModel.js";

const getTickets = asyncHandler(async (req, res) => {
   const tickets = await Ticket.find()
      .populate("teamMembers")
      .populate("createdBy");
   res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
   const ticket = await Ticket.findById(req.params.ticketId)
      .populate("teamMembers")
      .populate("createdBy")
      .populate("project");
   res.status(200).json(ticket);
});

const getProjectTickets = asyncHandler(async (req, res) => {
   const tickets = await Ticket.find({ project: req.params.ticketId })
      .populate("teamMembers")
      .populate("createdBy")
      .populate("project");

   res.status(200).json(tickets);
});

const createTicket = asyncHandler(async (req, res) => {
   const project = await Project.findById(req.body.project);
   if (!project) {
      res.status(404);
      throw new Error("Project not found");
   }

   if (!req.body.title || !req.body.description) {
      res.status(400);
      throw new Error("Please provide a title and description");
   }

   const newTicket = {
      ...req.body,
      title: req.body.title,
      description: req.body.description,
      teamMembers: req.body.teamMembers,
      //createdBy: req.user._id,
   };

   const ticket = await Ticket.create(newTicket);
   project.tickets.push(ticket);
   await project.save();
   res.status(200).json(ticket);
});

const updateTicket = asyncHandler(async (req, res) => {
   const ticket = await Ticket.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
      runValidators: true,
   });

   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
   }

   res.status(200).json(ticket);
});

const deleteTicket = asyncHandler(async (req, res) => {
   const ticket = await Ticket.findById(req.params.ticketId);
   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
   }
   await ticket.remove();
   res.status(200).json({ id: req.params.id });
});

export {
   getTickets,
   getTicket,
   getProjectTickets,
   createTicket,
   updateTicket,
   deleteTicket,
};
