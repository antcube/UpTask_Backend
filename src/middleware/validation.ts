import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";


export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    // Check errors in the request body
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        // If there are errors, return a 400 status with the error messages
        res.status(400).json({ errors: errors.array() });
        return;
    }
    next();
}