import mongoose, { Document, Schema } from 'mongoose';

// Define the Task interface extending Document
export interface ITask extends Document {
  title: string;
  description?: string;
  completed: boolean;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Task schema
const TaskSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    completed: { type: Boolean, default: false },
    deadline: { type: Date, required: true },
  },
  { timestamps: true }
);

// Export the Task model
export default mongoose.model<ITask>('Task', TaskSchema);
