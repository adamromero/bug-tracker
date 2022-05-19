import express from "express";
const router = express.Router();
import {
   getUsers,
   createUser,
   updateUser,
   deleteUser,
} from "../controllers/userController.js";

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);

export default router;
