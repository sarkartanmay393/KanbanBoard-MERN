import mongoose from "mongoose";

interface UserType {
  username: string;
  email: string;
  password: string;
  projectIds: string[];
  taskIds: string[];
}

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  projectIds: {
    type: [String],
  },
  taskIds: {
    type: [String],
  },
});

const User = mongoose.model<UserType>("User", userSchema);

export default User;
