import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const { projectId } = req.params;

        try {
            const project = await Project.findById(projectId);
            if (!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }
            const task = new Task(req.body);
            task.project = project.id; // Associate the task with the project
            project.tasks.push(task); // Add the task to the project's tasks array
            Promise.allSettled([task.save(), project.save()]);
            res.status(201).json({ message: "Task created successfully", task });
        } catch (error) {
            res.status(500).json({ error: "Failed to create task" });
        }
    }
}