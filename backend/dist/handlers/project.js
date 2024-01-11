"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allProject = exports.deleteProject = exports.updateProject = exports.createProject = void 0;
const Project_1 = __importDefault(require("../models/Project"));
const createProject = async (req, res) => {
    const { name, description, tasks, users } = req.body;
    try {
        const project = new Project_1.default({
            name,
            description,
            tasks,
            users,
        });
        const savedProject = await project.save();
        return res.json(savedProject.id);
    }
    catch (error) {
        return res.json(error);
    }
};
exports.createProject = createProject;
const updateProject = async (req, res) => {
    const { id } = req.params;
    console.log(req.params);
    const { name, description, tasks, users } = req.body;
    if (!id) {
        return res.json(`Error: no Project id was passed`);
    }
    try {
        const updatedProject = await Project_1.default.findByIdAndUpdate(id, {
            name,
            description,
            tasks,
            users,
        });
        if (!updateProject) {
            return res.json(`Error: couldn't find the Project`);
        }
        return res.json(updateProject);
    }
    catch (error) {
        return res.json(error);
    }
};
exports.updateProject = updateProject;
const deleteProject = async (req, res) => {
    const { id } = req.body;
    if (!id) {
        return res.json(`Error: no Project id was passed`);
    }
    try {
        const deletedProject = await Project_1.default.findByIdAndDelete({ _id: id });
        if (!deletedProject) {
            return res.json(`Error: couldn't find the Project`);
        }
        return res.json(deletedProject);
    }
    catch (error) {
        return res.json(error);
    }
};
exports.deleteProject = deleteProject;
const allProject = async (req, res) => {
    const Projects = await Project_1.default.find({});
    return res.json(Projects);
};
exports.allProject = allProject;
