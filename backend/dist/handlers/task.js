"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const User_1 = __importDefault(require("../models/User"));
const createTask = async (req, res) => {
    const { userid } = req.headers;
    const { title, description, tags, status, projectId, dueDate } = req.body;
    try {
        const task = new Task_1.default({
            title,
            description,
            tags,
            status,
            projectId,
            dueDate,
        });
        const savedTask = await task.save();
        await User_1.default.findByIdAndUpdate({ _id: userid }, {
            $push: {
                taskIds: savedTask.id,
            },
        });
        return res.json(savedTask);
    }
    catch (error) {
        return res.status(500).json(error);
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    const payload = req.body;
    try {
        const updatedTask = await Task_1.default.updateOne({ _id: payload._id }, {
            $set: {
                ...payload,
            },
        });
        if (!updatedTask) {
            return res.status(500).json(`Error: couldn't find the task`);
        }
        return res.json(updatedTask);
    }
    catch (error) {
        console.log(error);
        return res.json(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    const { userid } = req.headers;
    const { _id } = req.body;
    if (!_id) {
        return res.json(`Error: no task id was passed`);
    }
    try {
        await User_1.default.updateOne({ _id: userid }, {
            $pull: {
                taskIds: _id,
            },
        });
        const deletedTask = await Task_1.default.deleteOne({ _id: _id });
        // if (!deletedTask) {
        //   return res.json(`Error: couldn't find the task`);
        // }
        return res.json(deletedTask);
    }
    catch (error) {
        return res.json(error);
    }
};
exports.deleteTask = deleteTask;
const allTask = async (req, res) => {
    const { userid } = req.headers;
    try {
        const user = await User_1.default.findById({ _id: userid });
        const taskIds = user?.taskIds;
        const tasksDBdata = await Task_1.default.find({ _id: { $in: taskIds } });
        if (tasksDBdata) {
            return res.json(tasksDBdata);
        }
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
exports.allTask = allTask;
