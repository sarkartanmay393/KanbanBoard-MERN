"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async (callbackfn, pass) => {
    const uri = `mongodb+srv://tanmaysrkr:${pass}@cluster0.eucuekw.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose_1.default.connect(uri, {
            dbName: "KanbanBoard",
        });
        console.log(`Databased Connected!`);
        callbackfn();
    }
    catch (err) {
        console.log(`Error while db connection: ${err}`);
    }
};
exports.default = connectDatabase;
