import mongoose from "mongoose";
declare enum TaskStatus {
    NotStarted = "notstarted",
    InProgress = "inprogress",
    Review = "review",
    Complete = "complete"
}
interface TaskType {
    title: string;
    description: string;
    tags: string[];
    status: TaskStatus;
    projectId: string;
    dueDate: string;
}
declare const Task: mongoose.Model<TaskType, {}, {}, {}, mongoose.Document<unknown, {}, TaskType> & TaskType & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default Task;
