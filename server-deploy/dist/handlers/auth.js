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
exports.update = exports.logOut = exports.logIn = exports.signUp = void 0;
const bcrypt = __importStar(require("bcryptjs"));
const User_1 = __importDefault(require("../models/User"));
const createSecretToken_1 = __importDefault(require("../utils/createSecretToken"));
const update = async (req, res) => {
    const { userid } = req.headers;
    const { username, email, password, taskIds, projectIds } = req.body;
    try {
        return res.json();
    }
    catch (error) {
        return res.status(401).json(`${error}`);
    }
};
exports.update = update;
const logOut = async (_, res) => {
    try {
        res.clearCookie("token");
        console.log(`Logout successful!`);
        return res.json(`Come back soon!`);
    }
    catch (error) {
        return res.status(401).json(`${error}`);
    }
};
exports.logOut = logOut;
const signUp = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(401).json();
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 8);
        const user = new User_1.default({
            username: email.split("@")[0],
            email: email,
            password: hashedPassword,
        });
        const savedUser = await user.save();
        return res.json(savedUser);
    }
    catch (error) {
        return res.status(401).json(`${error}`);
    }
};
exports.signUp = signUp;
const logIn = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(301).json("email not found");
    }
    try {
        const user = await User_1.default.findOne(email.includes("@") ? { email } : { username: email }).exec();
        if (!user) {
            return res.status(401).json("Invalid username or email.");
        }
        const passwordMatched = await bcrypt.compare(password, user.password);
        if (!passwordMatched) {
            console.log("Invalid password");
            return res.status(401).json("Invalid password");
        }
        //Send the jwt token on successful login
        const token = (0, createSecretToken_1.default)(user.id);
        res.cookie("token", token, { signed: undefined });
        console.log(`Login successful! (${user.username})`);
        return res.json(user);
    }
    catch (error) {
        console.log(error);
        return res.json(`error: ${error}`);
    }
};
exports.logIn = logIn;
