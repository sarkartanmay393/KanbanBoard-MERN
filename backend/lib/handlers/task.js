"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allTask = exports.deleteTask = exports.updateTask = exports.createTask = void 0;
var Task_1 = require("../models/Task");
var User_1 = require("../models/User");
var createTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, _a, title, description, tags, status, projectId, dueDate, task, savedTask, user, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userid = req.headers.userid;
                _a = req.body, title = _a.title, description = _a.description, tags = _a.tags, status = _a.status, projectId = _a.projectId, dueDate = _a.dueDate;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                task = new Task_1.default({
                    title: title,
                    description: description,
                    tags: tags,
                    status: status,
                    projectId: projectId,
                    dueDate: dueDate,
                });
                return [4 /*yield*/, task.save()];
            case 2:
                savedTask = _b.sent();
                return [4 /*yield*/, User_1.default.findByIdAndUpdate({ _id: userid }, {
                        $push: {
                            taskIds: savedTask.id,
                        },
                    })];
            case 3:
                user = _b.sent();
                console.log(user === null || user === void 0 ? void 0 : user.taskIds);
                return [2 /*return*/, res.json(savedTask.id)];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(500).json(error_1)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createTask = createTask;
var updateTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var payload, updatedTask, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                payload = req.body;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, Task_1.default.findByIdAndUpdate(payload._id, payload)];
            case 2:
                updatedTask = _a.sent();
                if (!updatedTask) {
                    return [2 /*return*/, res.status(500).json("Error: couldn't find the task")];
                }
                return [2 /*return*/, res.json("payload updated succesfully")];
            case 3:
                error_2 = _a.sent();
                console.log(error_2);
                return [2 /*return*/, res.json(error_2)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.updateTask = updateTask;
var deleteTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, id, deletedTask, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.headers.userid;
                id = req.body.id;
                if (!id) {
                    return [2 /*return*/, res.json("Error: no task id was passed")];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findByIdAndUpdate({ _id: userid }, {
                        $pull: {
                            taskIds: id,
                        },
                    })];
            case 2:
                _a.sent();
                return [4 /*yield*/, Task_1.default.findByIdAndDelete({ _id: id })];
            case 3:
                deletedTask = _a.sent();
                if (!deletedTask) {
                    return [2 /*return*/, res.json("Error: couldn't find the task")];
                }
                return [2 /*return*/, res.json(deletedTask)];
            case 4:
                error_3 = _a.sent();
                return [2 /*return*/, res.json(error_3)];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteTask = deleteTask;
var allTask = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userid, user, allTasks, assignedTaskIds, accessedTasks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userid = req.headers.userid;
                return [4 /*yield*/, User_1.default.findById({ _id: userid })];
            case 1:
                user = _a.sent();
                return [4 /*yield*/, Task_1.default.find({})];
            case 2:
                allTasks = _a.sent();
                assignedTaskIds = user === null || user === void 0 ? void 0 : user.taskIds;
                if (assignedTaskIds) {
                    accessedTasks = allTasks.map(function (task) {
                        if (assignedTaskIds.includes(task.id)) {
                            return task;
                        }
                        return;
                    });
                    return [2 /*return*/, res.json(accessedTasks)];
                }
                return [2 /*return*/, res.status(500).json("couldn't find your associate tasks")];
        }
    });
}); };
exports.allTask = allTask;
