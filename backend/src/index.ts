import * as dotenv from "dotenv";
import express from "express";
import cookie from "cookie-parser";
dotenv.config();

import User from "./models/User";
import connectDatabase from "./utils/connectDatabase";
import { logIn, logOut, signUp } from "./handlers/auth";
import { createTask, deleteTask, allTask, updateTask } from "./handlers/task";
import path from "path";
import * as cors from "cors";
import verifyAuth from "./middlewares/verifyAuth";
import { ResType } from "./types";

const PORT = 8080;
const app = express();

app.use(cors.default());
app.use(express.json());
app.use(cookie());
app.use(express.static(path.join(__dirname, "../public")));

// Get request for all url other than '/api'
app.get(/^(?!\/api).+/, (_, res: ResType) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Authentication
app.post("/api/signup", signUp);
app.post("/api/login", logIn);
app.get("/api/logout", logOut);

app.use(verifyAuth);

// Task Management
app.post("/api/task/create", createTask);
app.post("/api/task/update/", updateTask);
app.post("/api/task/delete", deleteTask);
app.get("/api/task/all", allTask);

app.get("/api/users", async (_, res: ResType) => {
  const users = await User.find({});
  return res.json(users);
});

connectDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
