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
}

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
});

const Task = mongoose.model<TaskType>("Task", taskSchema);

export default Task;
