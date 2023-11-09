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
  tags: string[];
  status: TaskStatus;
  projectId: string;
  dueDate: string;
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  tags: {
    type: [String],
  },
  status: {
    type: String,
    enum: TaskStatus,
    default: TaskStatus.NotStarted,
  },
  projectId: {
    type: String,
  },
  dueDate: {
    type: String,
  },
});

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
