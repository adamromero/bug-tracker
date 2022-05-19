import express from "express";
const router = express.Router();
import {
   getTickets,
   createTicket,
   updateTicket,
   deleteTicket,
} from "../controllers/ticketController.js";

router.route("/").get(getTickets).post(createTicket);
router.route("/:id").put(updateTicket).delete(deleteTicket);

export default router;
