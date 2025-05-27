import { Request, Response } from "express";

export class ProjectController {
    static getAllProjects = async (req: Request, res: Response) => {
        res.send({ message: "Get all projects" });
    }

    static createProject = async (req: Request, res: Response) => {
        console.log(req.body);
        res.send({ message: "Create a new project" });
    }
}