import express from "express";
const router = express.Router();
import {
   registerUser,
   loginUser,
   getUser,
   updatePassword,
} from "../controllers/userController.js";

router.post("/", registerUser);
router.post("/login", loginUser);
router.put("/password", updatePassword);

export default router;
