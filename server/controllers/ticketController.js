import asyncHandler from "express-async-handler";
import Ticket from "../models/ticketModel.js";

const getTickets = asyncHandler(async (req, res) => {
   const tickets = await Ticket.find()
      .populate("assignedTo")
      .populate("createdBy");
   res.status(200).json(tickets);
});

const getTicket = asyncHandler(async (req, res) => {
   const ticket = await Ticket.findById(req.params.id)
      .populate("assignedTo")
      .populate("createdBy")
      .populate("project");
   res.status(200).json(ticket);
});

const createTicket = asyncHandler(async (req, res) => {
   console.log(req.body);
   if (!req.body.title || !req.body.description) {
      res.status(400);
      throw new Error("Please provide a title and description");
   }

   const newTicket = {
      ...req.body,
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.teamMembers,
      //createdBy: req.user._id,
   };

   const ticket = await Ticket.create(newTicket);
   res.status(200).json(ticket);
});

const updateTicket = asyncHandler(async (req, res) => {
   const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
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
   const ticket = await Ticket.findById(req.params.id);
   if (!ticket) {
      res.status(404);
      throw new Error("Ticket not found");
   }
   await ticket.remove();
   res.status(200).json({ id: req.params.id });
});

export { getTickets, getTicket, createTicket, updateTicket, deleteTicket };
