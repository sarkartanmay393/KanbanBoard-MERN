import * as dotenv from "dotenv";
dotenv.config();

import * as cors from "cors";
import express from "express";
import cookie from "cookie-parser";

import { createTask, deleteTask, allTask, updateTask } from "./handlers/task";
import connectDatabase from "./utils/connectDatabase";
import { logIn, logOut, signUp, update } from "./handlers/auth";
import verifyAuth from "./middlewares/verifyAuth";

const PORT = 8080;
const app = express();

// Middlewares
app.use(
  cors.default({
    origin: ["http://localhost:3000", "https://kanbanboard-ui.vercel.app"],
    credentials: true,
  })
);
app.use(cookie());
app.use(express.json());

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

connectDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
