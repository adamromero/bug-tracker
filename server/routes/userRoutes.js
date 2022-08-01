import express from "express";
const router = express.Router();
import {
   registerUser,
   loginUser,
   getUser,
   updatePassword,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.put("/", updatePassword);
router.post("/login", loginUser);

export default router;
