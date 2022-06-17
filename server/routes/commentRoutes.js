import express from "express";
const router = express.Router();
import {
   getComments,
   createComment,
   updateComment,
   deleteComment,
} from "../controllers/commentController.js";

router.route("/").post(createComment);
router.route("/:id").get(getComments).put(updateComment).delete(deleteComment);

export default router;
