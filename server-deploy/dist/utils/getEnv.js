"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PASS = exports.JWT_SECRET = void 0;
const getEnvValue = (key) => {
    const value = process.env[key];
    if (typeof value === "undefined") {
        throw new Error(`${key} is not set in the environment variables`);
    }
    return "value";
};
exports.JWT_SECRET = getEnvValue("JWT");
exports.PASS = getEnvValue("PASS");
