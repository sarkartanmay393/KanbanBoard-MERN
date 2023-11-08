import * as dotenv from "dotenv";
import express from "express";
import cookie from "cookie-parser";
dotenv.config();

import User from "./models/User";
import connectDatabase from "./utils/connectDatabase";
import { logIn, signUp } from "./handlers/auth";
import { createTask, deleteTask, allTask } from "./handlers/task";
import { fileURLToPath } from "url";
import path from "path";
import * as cors from "cors";

const PORT = 8080 || process.env.PORT;
const app = express();

app.use(cors.default());
app.use(express.json());
app.use(cookie());
app.use(express.static(path.join(__dirname, "../public")));

// Get request for all url other than '/api'
app.get(/^(?!\/api).+/, (req, res) => {
  console.log(req.url);
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Authentication
app.post("/api/signup", signUp);
app.post("/api/login", logIn);

// Task Management
app.post("/api/task/create", createTask);
// app.put("/task/update/", updateTask);
app.post("/api/task/delete", deleteTask);
app.get("/api/task/all", allTask);
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

app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  return res.json(users);
});

connectDatabase(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});
