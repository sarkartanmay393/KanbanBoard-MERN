import * as dotenv from "dotenv";
import express from "express";
import cookie from "cookie-parser";
dotenv.config();

import path from "path";
import * as cors from "cors";

import { createTask, deleteTask, allTask, updateTask } from "./handlers/task";
import User from "./models/User";
import connectDatabase from "./utils/connectDatabase";
import { logIn, logOut, signUp, update } from "./handlers/auth";
import verifyAuth from "./middlewares/verifyAuth";
import { ResType } from "./types";

const PORT = 8080;
const app = express();

app.use(cors.default({ origin: "*" }));

app.use(cookie());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Get request for all url other than '/api'
app.get(/^(?!\/api).+/, (_, res: ResType) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Authentication
app.post("/api/signup", signUp);
app.post("/api/login", logIn);

app.use(verifyAuth);
app.post("/api/update", update);
app.get("/api/logout", logOut);

// Task Management
app.get("/api/task/all", allTask);
app.post("/api/task/create", createTask);
app.post("/api/task/update/", updateTask);
app.post("/api/task/delete", deleteTask);

app.get("/api/users", async (_: any, res: ResType) => {
  const users = await User.find({});
  return res.json(users);
});

connectDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
