import { Schema } from 'mongoose';

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  assignedTo: { type: Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
  createdAt: { type: Date, default: Date.now },
  dueDate: { type: Date },
});
