import Task from "../models/Task";
import User from "../models/User";
import { ReqTypeArrayBody, type ReqType, type ResType } from "../types/index";

const createTask = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;
  const { title, description, tags, status, projectId, dueDate } = req.body;
  try {
    const task = new Task({
      title,
      description,
      tags,
      status,
      projectId,
      dueDate,
    });
    const savedTask = await task.save();
    await User.findByIdAndUpdate(
      { _id: userid },
      {
        $push: {
          taskIds: savedTask.id,
        },
      }
    );

    return res.json(savedTask);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req: ReqTypeArrayBody, res: ResType) => {
  const payload = req.body;

  try {
    const updatedTask = await Task.updateOne(
      { _id: payload._id },
      {
        $set: {
          ...payload,
        },
      }
    );
    if (!updatedTask) {
      return res.status(500).json(`Error: couldn't find the task`);
    }
    return res.json(updatedTask);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const deleteTask = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;
  const { _id } = req.body;

  if (!_id) {
    return res.json(`Error: no task id was passed`);
  }

  try {
    await User.updateOne(
      { _id: userid },
      {
        $pull: {
          taskIds: _id,
        },
      }
    );
    const deletedTask = await Task.deleteOne({ _id: _id });
    // if (!deletedTask) {
    //   return res.json(`Error: couldn't find the task`);
    // }

    return res.json(deletedTask);
  } catch (error) {
    return res.json(error);
  }
};

const allTask = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;
  try {
    const user = await User.findById({ _id: userid });
    const taskIds: string[] = user?.taskIds ?? [];
    const tasks = await Task.find({ _id: { $in: taskIds } });
    return res.json(tasks);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

export { createTask, updateTask, deleteTask, allTask };
