"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var getEnv_1 = require("./getEnv");
var createSecretToken = function (id) {
    return jwt.sign({ id: id }, getEnv_1.JWT_SECRET, {
        expiresIn: "15m",
    });
};
exports.default = createSecretToken;
