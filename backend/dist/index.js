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
dotenv.config();
const cors = __importStar(require("cors"));
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const task_1 = require("./handlers/task");
const connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
const auth_1 = require("./handlers/auth");
const verifyAuth_1 = __importDefault(require("./middlewares/verifyAuth"));
const path_1 = __importDefault(require("path"));
const PORT = 8080;
const app = (0, express_1.default)();
// Middlewares
app.use(cors.default({ origin: "*" }));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("^(?!/api/).*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Authentication
app.post("/api/signup", auth_1.signUp);
app.post("/api/login", auth_1.logIn);
app.use(verifyAuth_1.default);
app.post("/api/update", auth_1.update);
app.get("/api/logout", auth_1.logOut);
// Task Management
app.get("/api/task/all", task_1.allTask);
app.post("/api/task/create", task_1.createTask);
app.post("/api/task/update/", task_1.updateTask);
app.post("/api/task/delete", task_1.deleteTask);
(0, connectDatabase_1.default)(() => {
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
