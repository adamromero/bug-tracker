import express from "express";
const router = express.Router();
import {
   getUsers,
   updateUser,
   deleteUser,
} from "../controllers/allUsersController.js";

router.route("/").get(getUsers);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
