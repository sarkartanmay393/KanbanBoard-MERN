import mongoose from "mongoose";
interface UserType {
    username: string;
    email: string;
    password: string;
    projectIds: string[];
    taskIds: string[];
}
declare const User: mongoose.Model<UserType, {}, {}, {}, mongoose.Document<unknown, {}, UserType> & UserType & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default User;
