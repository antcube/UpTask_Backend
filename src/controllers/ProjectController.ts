import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);
        try {
            await project.save();
            res.status(201).json({ message: "Project created successfully", project });
        } catch (error) {
            res.status(500).json({ error: "Failed to create project" });
        }
    }

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.status(200).json(projects);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch projects" });
        }
    }

    static getProjectById = async (req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "Project retrieved successfully", data: req.project });
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch project" });
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        try {
            // Update the project with the new data
            Object.assign(req.project, req.body);
            await req.project.save();
            res.status(200).json({ message: "Project updated successfully", data: req.project });
        } catch (error) {
            res.status(500).json({ error: "Failed to update project" });
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        try {
            // Remove the project and its tasks
            await Promise.allSettled([
                req.project.deleteOne(),
                Task.deleteMany({ project: req.project.id }) // Assuming Task model has a project field
            ]);
            res.status(200).json({ message: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "Failed to delete project" })
        }
    }

}