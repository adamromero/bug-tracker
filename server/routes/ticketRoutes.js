import express from "express";
const router = express.Router();
import {
   getTickets,
   getTicket,
   createTicket,
   updateTicket,
   deleteTicket,
} from "../controllers/ticketController.js";

router.route("/").get(getTickets).post(createTicket);
router.route("/:id").get(getTicket).put(updateTicket).delete(deleteTicket);

export default router;
