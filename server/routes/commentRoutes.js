import express from "express";
const router = express.Router();
import {
   getComments,
   createComment,
   updateComment,
   deleteComment,
} from "../controllers/commentController.js";

router.route("/").get(getComments).post(createComment);
router.route("/:id").put(updateComment).delete(deleteComment);

export default router;
