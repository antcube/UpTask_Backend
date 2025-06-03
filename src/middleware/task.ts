import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import Task, { ITask } from "../models/Task";

declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export const taskExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if taskId is in ObjectId format
        const { taskId } = req.params;
        if (!Types.ObjectId.isValid(taskId)) {
            res.status(400).json({ message: "Invalid task ID format" });
            return;
        }
        // Check if the task exists
        const task = await Task.findById(taskId);
        if (!task) {
            res.status(404).json({ message: "Task not found" });
            return;
        }
        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}

export const taskBelongsToProject = (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if the task belongs to the project
        if (req.task.project.toString() !== req.project.id.toString()) {
            res.status(403).json({ message: "Forbidden: Access to this task is not allowed" });
            return;
        }
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
    }
}