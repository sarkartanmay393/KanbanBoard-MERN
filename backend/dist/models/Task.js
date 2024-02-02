"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NotStarted"] = "notstarted";
    TaskStatus["InProgress"] = "inprogress";
    TaskStatus["Review"] = "review";
    TaskStatus["Complete"] = "complete";
})(TaskStatus || (TaskStatus = {}));
const taskSchema = new mongoose_1.default.Schema({
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
const Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
