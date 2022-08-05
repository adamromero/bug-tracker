import express from "express";
const router = express.Router();
import {
   registerUser,
   loginUser,
   updateImage,
   updatePassword,
} from "../controllers/userController.js";

router.route("/").post(registerUser).put(updatePassword).put(updateImage);
router.route("/login").post(loginUser);

export default router;
