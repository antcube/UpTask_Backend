import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";

// Create a new router instance
const router = Router();

/** Routes for Projects */
router.post('/', 
    body('projectName')
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3 })
        .withMessage('Project name must be at least 3 characters long'),
    body('clientName')
        .notEmpty()
        .withMessage('Client name is required')
        .isLength({ min: 3 })
        .withMessage('Client name must be at least 3 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),
    handleInputErrors,
    ProjectController.createProject
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', 
    param('id')
        .isMongoId()
        .withMessage('Invalid project ID format'),
    handleInputErrors,
    ProjectController.getProjectById
)

router.put('/:id',
    param('id')
        .isMongoId()
        .withMessage('Invalid project ID format'),
    body('projectName')
        .notEmpty()
        .withMessage('Project name is required')
        .isLength({ min: 3 })
        .withMessage('Project name must be at least 3 characters long'),
    body('clientName')
        .notEmpty()
        .withMessage('Client name is required')
        .isLength({ min: 3 })
        .withMessage('Client name must be at least 3 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isLength({ min: 10 })
        .withMessage('Description must be at least 10 characters long'),        
    handleInputErrors,
    ProjectController.updateProject
)

router.delete('/:id', 
    param('id')
        .isMongoId()
        .withMessage('Invalid project ID format'),
    handleInputErrors,
    ProjectController.deleteProject
)


/** Routes for Tasks */
router.post('/:projectId/tasks',
    TaskController.createTask
)

export default router;