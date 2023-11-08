import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cookie from "cookie-parser";
dotenv.config();

import User from "./models/User";
import connectDatabase from "./utils/connectDatabase";
import { logIn, signUp } from "./handlers/auth";
import { createTask, deleteTask, allTask } from "./handlers/task";

const PORT = 8080 || process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookie());

// Authentication
app.post("/signup", signUp);
app.post("/login", logIn);

// Task Management
app.post("/task/create", createTask);
// app.put("/task/update/", updateTask);
app.post("/task/delete", deleteTask);
app.get("/task/all", allTask);
// app.post("/signup", signUp);
// app.post("/login", logIn);

// app.use(async (req: ReqType, res: ResType, next: NextFunction) => {
//   const { token } = req.cookies as { token: string };
//   if (!token) {
//     return res.json({ status: false });
//   }

//   jwt.verify(token, JWT_SECRET, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data);
//       if (user) {
//         next();
//       } else return res.json({ status: false });
//     }
//   });
// });

app.get("/", async (req, res) => {
  return res.json("Welcome to Kanban Board Backend!");
});

app.get("/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

connectDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
