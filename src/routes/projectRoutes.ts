import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";
import { TaskController } from "../controllers/TaskController";
import { projectExists } from "../middleware/project";
import { taskBelongsToProject, taskExists } from "../middleware/task";

// Create a new router instance
const router = Router();

/** Routes for Projects */
router.param('projectId', projectExists)

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

router.get('/:projectId',
    ProjectController.getProjectById
)

router.put('/:projectId',
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

router.delete('/:projectId',
    ProjectController.deleteProject
)


/** Routes for Tasks */
router.param('taskId', taskExists)
router.param('taskId', taskBelongsToProject)

router.post('/:projectId/tasks',
    body('name')
        .notEmpty()
        .withMessage('Task name is required')
        .isLength({ min: 3 })
        .withMessage('Task name must be at least 3 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Task description is required')
        .isLength({ min: 10 })
        .withMessage('Task description must be at least 10 characters long'),
    handleInputErrors,
    TaskController.createTask
)

router.get('/:projectId/tasks',
    TaskController.getProjectTasks
)

router.get('/:projectId/tasks/:taskId',
    TaskController.getTaskById
)

router.put('/:projectId/tasks/:taskId',
    body('name')
        .notEmpty()
        .withMessage('Task name is required')
        .isLength({ min: 3 })
        .withMessage('Task name must be at least 3 characters long'),
    body('description')
        .notEmpty()
        .withMessage('Task description is required')
        .isLength({ min: 10 })
        .withMessage('Task description must be at least 10 characters long'),
    handleInputErrors,
    TaskController.updateTask
)

router.delete('/:projectId/tasks/:taskId',
    handleInputErrors,
    TaskController.deleteTask
)

router.patch('/:projectId/tasks/:taskId/status',
    body('status')
        .notEmpty()
        .withMessage('Task status is required')
        .isIn(['pending', 'onHold', 'inProgress', 'underReview', 'completed'])
        .withMessage('Invalid task status'),
    handleInputErrors,
    TaskController.updateStatus
)

export default router;