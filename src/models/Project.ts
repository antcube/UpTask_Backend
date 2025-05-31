import mongoose, { Document, PopulatedDoc, Schema, Types } from "mongoose";
import { ITask } from "./Task";

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
    tasks: PopulatedDoc<ITask & Document>[] // Array of tasks associated with the project
}

// Define the Project schema
const ProjectSchema = new Schema<IProject>({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true
    }]
}, {timestamps: true});

// Create the Project model
const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;