import express from "express";
const router = express.Router();
import {
   getTicketsByUser,
   getTicket,
   getProjectTickets,
   createTicket,
   updateTicket,
   deleteTicket,
} from "../controllers/ticketController.js";

router
   .route("/:ticketId")
   .post(createTicket)
   .delete(deleteTicket)
   .get(getTicket)
   .put(updateTicket);

router.route("/user/:userId").get(getTicketsByUser);

export default router;
