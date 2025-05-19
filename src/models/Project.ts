import mongoose, { Document, Schema } from "mongoose";

export interface IProject extends Document {
    projectName: string
    clientName: string
    description: string
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
    }
}, {timestamps: true});

// Create the Project model
const Project = mongoose.model<IProject>("Project", ProjectSchema);
export default Project;