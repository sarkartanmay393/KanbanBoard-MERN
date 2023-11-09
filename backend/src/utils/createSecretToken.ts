import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./getEnv";

const createSecretToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "15m",
  });
};

export default createSecretToken;
