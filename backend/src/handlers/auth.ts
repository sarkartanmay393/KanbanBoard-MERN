import * as bcrypt from "bcryptjs";
import User from "../models/User";
import { ReqType, ResType } from "../types/index";
import createSecretToken from "../utils/createSecretToken";

const update = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;
  const { username, email, password, taskIds, projectIds } = req.body;

  try {
    return res.json();
  } catch (error) {
    return res.status(401).json(`${error}`);
  }
};

const logOut = async (_: ReqType, res: ResType) => {
  try {
    res.clearCookie("token");
    console.log(`Logout successful!`);
    return res.json(`Come back soon!`);
  } catch (error) {
    return res.status(401).json(`${error}`);
  }
};

const signUp = async (req: ReqType, res: ResType) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json();
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 8);
    const user = new User({
      username: email.split("@")[0],
      email: email,
      password: hashedPassword,
    });
    const savedUser = await user.save();

    return res.json(savedUser);
  } catch (error) {
    return res.status(401).json(`${error}`);
  }
};

const logIn = async (req: ReqType, res: ResType) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(301).json("email not found");
  }

  try {
    const user = await User.findOne(
      email.includes("@") ? { email } : { username: email }
    ).exec();

    if (!user) {
      return res.status(401).json("Invalid username or email.");
    }

    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      console.log("Invalid password");
      return res.status(401).json("Invalid password");
    }

    //Send the jwt token on successful login
    const token = createSecretToken(user.id);
    res.cookie("token", token, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    console.log(`Login successful! (${user.username})`);
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.json(`error: ${error}`);
  }
};

export { signUp, logIn, logOut, update };
