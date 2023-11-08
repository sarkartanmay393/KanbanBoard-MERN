import mongoose from "mongoose";

enum TaskStatus {
  NotStarted = "notstarted",
  InProgress = "inprogress",
  Review = "review",
  Complete = "complete",
}

interface TaskType {
  title: string;
  description: string;
  labels: string[];
  tags: string[];
  status: TaskStatus;
  // users: string[];
  // project: string[];
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  labels: {
    type: [String],
  },
  tags: {
    type: [String],
  },
  status: {
    type: String,
    enum: TaskStatus,
    default: TaskStatus.NotStarted,
  },
});

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
