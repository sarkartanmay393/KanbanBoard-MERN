import mongoose from "mongoose";
import { MONGODB } from "./getEnv";

const connectDatabase = async (callbackfn: Function) => {
  try {
    await mongoose.connect(MONGODB, {
      dbName: "KanbanBoard",
    });
    console.log(`Databased Connected!`);
    callbackfn();
  } catch (err) {
    console.log(`Error while db connection: ${err}`);
  }
};

export default connectDatabase;
