import { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id; // Associate the task with the project
            req.project.tasks.push(task.id); // Add the task to the project's tasks array
            await Promise.allSettled([task.save(), req.project.save()]);
            res.status(201).json({ message: "Task created successfully", task });
        } catch (error) {
            res.status(500).json({ error: "Failed to create task" });
        }
    }

    static getProjectTasks = async (req: Request, res: Response) => {
        try {
            // populate the project field in the Task model
            const tasks = await Task.find({ project: req.project.id}).populate('project');
            if (tasks.length === 0) {
                res.status(404).json({ message: "No tasks found for this project" });
                return;
            }
            res.status(200).json(tasks);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch tasks" });
        }
    }

    static getTaskById = async (req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "Task retrieved successfully", data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch task" });
        }
    }

    static updateTask = async (req: Request, res: Response) => {
        try {
            // Update the task with the new data
            Object.assign(req.task, req.body);
            await req.task.save();
            res.status(200).json({ message: "Task updated successfully", data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to update task" });
        }
    }

    static deleteTask = async (req: Request, res: Response) => {
        try {
            // Remove the task and its reference from the project - this is ok for few tasks
            // req.project.tasks = req.project.tasks.filter(task => task.toString() !== taskId);
            // await Promise.allSettled([task.deleteOne(), req.project.save()]);

            // Remove the task and its reference from the Task model - this is for many tasks
            await Promise.allSettled([
                req.task.deleteOne(),
                req.project.updateOne({ $pull: { tasks: req.task.id } })
            ])
            res.status(200).json({ message: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete task" });
        }
    }

    static updateStatus = async (req: Request, res: Response) => {
        try {
            // Update the status of the task
            const { status } = req.body;
            Object.assign(req.task, { status });
            await req.task.save();
            res.status(200).json({ message: "Task status updated successfully", data: req.task });
        } catch (error) {
            res.status(500).json({ error: "Failed to update task status" });
        }
    }
}