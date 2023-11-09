"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var TaskStatus;
(function (TaskStatus) {
    TaskStatus["NotStarted"] = "notstarted";
    TaskStatus["InProgress"] = "inprogress";
    TaskStatus["Review"] = "review";
    TaskStatus["Complete"] = "complete";
})(TaskStatus || (TaskStatus = {}));
var taskSchema = new mongoose_1.default.Schema({
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
var Task = mongoose_1.default.model("Task", taskSchema);
exports.default = Task;
