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
   .route("/:id")
   .post(createTicket)
   .delete(deleteTicket)
   .get(getTicket)
   .put(updateTicket);

router.route("/user/:id").get(getTicketsByUser);
router.route("/project/:id").get(getProjectTickets);

export default router;
