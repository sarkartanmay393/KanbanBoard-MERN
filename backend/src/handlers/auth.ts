import bcrypt from "bcryptjs";
import User from "../models/User";
import { ReqType, ResType } from "../types/index";
import createSecretToken from "../utils/createSecretToken";

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
    console.log(savedUser);

    const token = createSecretToken(user.password);
    res.cookie("token", token, {
      maxAge: 8640000,
    });

    return res.json(savedUser.id);
  } catch (error) {
    return res.status(401).json(`${error}`);
  }
};

const logIn = async (req: ReqType, res: ResType) => {
  const { email, password } = req.body;
  console.log(req.body);
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

    const token = createSecretToken(user.password);
    res.cookie("token", token, {
      maxAge: 8640000,
    });

    console.log(`Login successful! (${user.username})`);
    return res.json(user.id);
  } catch (error) {
    console.log(error);
    return res.json(`error: ${error}`);
  }
};

export { signUp, logIn };
