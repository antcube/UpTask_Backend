import { Router } from "express";
import { ProjectController } from "../controllers/ProjectController";

// Create a new router instance
const router = Router();

/** Routes for Projects */
router.get('/', ProjectController.getAllProjects);

router.post('/', ProjectController.createProject);

export default router;