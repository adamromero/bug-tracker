import express from "express";
const router = express.Router();
import { getUsers } from "../controllers/allUsersController.js";

router.route("/").get(getUsers);

export default router;
