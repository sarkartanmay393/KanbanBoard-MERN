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
    const user = await User.findByIdAndUpdate(
      { _id: userid },
      {
        $push: {
          taskIds: savedTask.id,
        },
      }
    );
    console.log(user?.taskIds);
    return res.json(savedTask.id);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const updateTask = async (req: ReqTypeArrayBody, res: ResType) => {
  const payload = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(payload._id, payload);
    if (!updateTask) {
      return res.status(500).json(`Error: couldn't find the task`);
    }
    return res.json("payload updated succesfully"!);
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

const deleteTask = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;
  const { id } = req.body;
  // authtoken is user id
  const { authtoken } = req.headers;

  if (!id) {
    return res.json(`Error: no task id was passed`);
  }

  try {
    const user = await User.findByIdAndUpdate(
      { _id: userid },
      {
        $pull: {
          taskIds: id,
        },
      }
    );
    const deletedTask = await Task.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      return res.json(`Error: couldn't find the task`);
    }
    // await User.findByIdAndUpdate;

    return res.json(deletedTask);
  } catch (error) {
    return res.json(error);
  }
};

const allTask = async (req: ReqType, res: ResType) => {
  const { userid } = req.headers;

  const user = await User.findById({ _id: userid });
  const allTasks = await Task.find({});
  const assignedTaskIds = user?.taskIds;

  if (assignedTaskIds) {
    const accessedTasks = allTasks.map((task) => {
      if (assignedTaskIds.includes(task.id)) {
        return task;
      }
    });

    return res.json(accessedTasks);
  }

  return res.status(500).json(`couldn't find your associate tasks`);
};

export { createTask, updateTask, deleteTask, allTask };
