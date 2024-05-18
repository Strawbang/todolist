import { Schema } from 'mongoose';

export const CommentSchema = new Schema({
  text: { type: String, required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});