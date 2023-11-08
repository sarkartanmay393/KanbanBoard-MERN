import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./getEnv";

const createSecretToken = (id: string) => {
  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export default createSecretToken;
