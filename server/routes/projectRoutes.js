import express from "express";
const router = express.Router();
import {
   getProjects,
   getProject,
   createProject,
   updateProject,
   deleteProject,
} from "../controllers/projectController.js";

router.route("/").get(getProjects).post(createProject);
router.route("/:id").get(getProject).put(updateProject).delete(deleteProject);

export default router;
