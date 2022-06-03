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

//router.route("/").get(getTickets).post(createTicket);
router.route("/:projectId").get(getProjectTickets).post(createTicket);
router
   .route("/:projectId/:ticketId")
   .get(getTickets)
   .get(getTicket)
   .put(updateTicket)
   .delete(deleteTicket);

export default router;
