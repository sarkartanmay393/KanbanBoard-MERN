"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    projectIds: {
        type: [String],
    },
    taskIds: {
        type: [String],
    },
});
var User = mongoose_1.default.model("User", userSchema);
exports.default = User;
