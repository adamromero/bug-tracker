import express from "express";
const router = express.Router();
import {
   getImage,
   postImage,
   deleteImage,
} from "../controllers/awsController.js";

router.route("/").post(postImage);
router.route("/:id").get(getImage).delete(deleteImage);

export default router;
