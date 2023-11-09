import jwt from "jsonwebtoken";
import { NextFunction } from "express";
import { ReqType, ResType } from "../types";
import { JWT_SECRET } from "../utils/getEnv";

export default async (req: ReqType, res: ResType, next: NextFunction) => {
  const { token } = req.cookies as { token: string };
  if (!token) {
    console.log("no token");
    return res.status(401).json(false);
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      id: string;
      [key: string]: string;
    };
    req.headers["userid"] = decodedToken.id;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).send(`${err}`);
  }
};
