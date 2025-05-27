import { Request, Response } from "express";
import Project from "../models/Project";

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
        const { id } = req.params;

        try {
            const project = await Project.findById(id);
            if(!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }
            res.status(200).json({ message: "Project retrieved successfully", data: project})
            
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch project" });
        }
    }

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findByIdAndUpdate(id, req.body, { new: true });
            if (!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }
            await project.save();
            res.status(200).json({ message: "Project updated successfully", data: project});
        } catch (error) {
            res.status(500).json({ error: "Failed to update project" });
        }
    }

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const project = await Project.findById(id);
            if (!project) {
                res.status(404).json({ error: "Project not found" });
                return;
            }
            await project.deleteOne();
            res.status(200).json({ message: "Project deleted successfully" })
        } catch (error) {
            res.status(500).json({ error: "Failed to delete project" })
        }
    }

}