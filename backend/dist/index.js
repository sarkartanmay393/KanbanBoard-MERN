"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv.config();
const User_1 = __importDefault(require("./models/User"));
const connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
const auth_1 = require("./handlers/auth");
const task_1 = require("./handlers/task");
const path_1 = __importDefault(require("path"));
const cors = __importStar(require("cors"));
const verifyAuth_1 = __importDefault(require("./middlewares/verifyAuth"));
const PORT = 8080 || process.env.PORT;
const app = (0, express_1.default)();
app.use(cors.default());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
// Get request for all url other than '/api'
app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Authentication
app.post("/api/signup", auth_1.signUp);
app.post("/api/login", auth_1.logIn);
app.get("/api/logout", auth_1.logOut);
app.use(verifyAuth_1.default);
// Task Management
app.post("/api/task/create", task_1.createTask);
app.post("/api/task/update/", task_1.updateTask);
app.post("/api/task/delete", task_1.deleteTask);
app.get("/api/task/all", task_1.allTask);
app.get("/api/users", async (req, res) => {
    const users = await User_1.default.find({});
    return res.json(users);
});
(0, connectDatabase_1.default)(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
