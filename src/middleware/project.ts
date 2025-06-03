import { NextFunction, Request, Response } from "express";
import Project, { IProject } from "../models/Project";
import { Types } from "mongoose";

// Add project to the Express Request interface
declare global {
    namespace Express {
        interface Request {
            project: IProject;
        }
    }
}

export const projectExists = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Check if projectId is ObjectId format
        const { projectId } = req.params;
        if (!Types.ObjectId.isValid(projectId)) {
            res.status(400).json({ message: "Invalid project ID format" });
            return;
        }
        // Check if the project exists
        const project = await Project.findById(projectId);
        if (!project) {
            res.status(404).json({ message: "Project not found" });
            return;
        }
        // Attach the project to the request object
        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}