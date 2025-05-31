import mongoose, { Document, Schema, Types } from "mongoose";

const taskStatus = {
    PENDING: "Pending",
    ON_HOLD: "OnHold",
    IN_PROGRESS: "InProgress",
    UNDER_REVIEW: "UnderReview",
    COMPLETED: "Completed"
} as const;

export type TaskStatus = typeof taskStatus[keyof typeof taskStatus];

export interface ITask extends Document {
    name: string
    description: string
    project: Types.ObjectId
    status: TaskStatus
}

// Define the Task schema
export const TaskSchema = new Schema<ITask>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    status: {
        type: String,
        enum: Object.values(taskStatus),
        default: taskStatus.PENDING,
        required: true
    }
}, { timestamps: true });

// Create the Task model
const Task = mongoose.model<ITask>("Task", TaskSchema);
export default Task;