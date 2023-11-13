"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const projectSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    tasks: {
        type: [String],
    },
    users: {
        type: [String],
    },
});
const Project = mongoose_1.default.model("Project", projectSchema);
exports.default = Project;
