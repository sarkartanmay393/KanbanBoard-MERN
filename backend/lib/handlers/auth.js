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
exports.logOut = exports.logIn = exports.signUp = void 0;
var bcrypt = require("bcryptjs");
var User_1 = require("../models/User");
var createSecretToken_1 = require("../utils/createSecretToken");
var logOut = function (_, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            res.clearCookie("token");
            console.log("Logout successful!");
            return [2 /*return*/, res.json("Come back soon!")];
        }
        catch (error) {
            return [2 /*return*/, res.status(401).json("".concat(error))];
        }
        return [2 /*return*/];
    });
}); };
exports.logOut = logOut;
var signUp = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, hashedPassword, user, savedUser, error_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.status(401).json()];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, bcrypt.hash(password, 8)];
            case 2:
                hashedPassword = _b.sent();
                user = new User_1.default({
                    username: email.split("@")[0],
                    email: email,
                    password: hashedPassword,
                });
                return [4 /*yield*/, user.save()];
            case 3:
                savedUser = _b.sent();
                return [2 /*return*/, res.json(savedUser.id)];
            case 4:
                error_1 = _b.sent();
                return [2 /*return*/, res.status(401).json("".concat(error_1))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.signUp = signUp;
var logIn = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, passwordMatched, token, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.status(301).json("email not found")];
                }
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                return [4 /*yield*/, User_1.default.findOne(email.includes("@") ? { email: email } : { username: email }).exec()];
            case 2:
                user = _b.sent();
                if (!user) {
                    return [2 /*return*/, res.status(401).json("Invalid username or email.")];
                }
                return [4 /*yield*/, bcrypt.compare(password, user.password)];
            case 3:
                passwordMatched = _b.sent();
                if (!passwordMatched) {
                    console.log("Invalid password");
                    return [2 /*return*/, res.status(401).json("Invalid password")];
                }
                token = (0, createSecretToken_1.default)(user.id);
                res.cookie("token", token, { signed: undefined });
                console.log("Login successful! (".concat(user.username, ")"));
                return [2 /*return*/, res.json(user)];
            case 4:
                error_2 = _b.sent();
                console.log(error_2);
                return [2 /*return*/, res.json("error: ".concat(error_2))];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.logIn = logIn;
