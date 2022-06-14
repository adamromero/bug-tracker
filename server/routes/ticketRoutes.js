import express from "express";
const router = express.Router();
import {
   getTickets,
   getTicket,
   getProjectTickets,
   createTicket,
   updateTicket,
   deleteTicket,
} from "../controllers/ticketController.js";

router
   .route("/:ticketId")
   .get(getProjectTickets)
   .post(createTicket)
   .delete(deleteTicket)
   .get(getTickets)
   .get(getTicket)
   .put(updateTicket);

export default router;
