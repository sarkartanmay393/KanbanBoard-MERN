import mongoose from "mongoose";

const connectDatabase = async (callbackfn: Function) => {
  const uri = `mongodb+srv://tanmaysrkr:e9HXXHeZzN5c95EE@cluster0.eucuekw.mongodb.net/?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(uri, {
      dbName: "KanbanBoard",
    });
    console.log(`Databased Connected!`);
    callbackfn();
  } catch (err) {
    console.log(`Error while db connection: ${err}`);
  }
};

export default connectDatabase;
