"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB = exports.PORT = exports.JWT_SECRET = void 0;
var getEnvValue = function (key) {
    var value = process.env[key];
    if (typeof value === "undefined") {
        throw new Error("".concat(key, " is not set in the environment variables"));
    }
    return value;
};
exports.JWT_SECRET = getEnvValue("JWT");
exports.PORT = getEnvValue("PORT");
exports.MONGODB = getEnvValue("MONGODB");
