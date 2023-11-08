import bcrypt from "bcryptjs";
import User from "../models/User";
import { ReqType, ResType } from "../types/index";
import createSecretToken from "../utils/createSecretToken";
import Task from "../models/Task";
import { kMaxLength } from "buffer";

const createTask = async (req: ReqType, res: ResType) => {
  const { title, description, labels, tags } = req.body;
  try {
    const task = new Task({
      title,
      description,
      labels,
      tags,
    });
    const savedTask = await task.save();
    return res.json(savedTask.id);
  } catch (error) {
    return res.json(error);
  }
};

const updateTask = async (req: ReqType, res: ResType) => {
  const { id } = req.params;
  console.log(req.params);
  const { title, description, labels, tags } = req.body;

  if (!id) {
    return res.json(`Error: no task id was passed`);
  }

  try {
    const updatedTask = await Task.findByIdAndUpdate(id, {
      title,
      description,
      labels,
      tags,
    });

    if (!updateTask) {
      return res.json(`Error: couldn't find the task`);
    }

    return res.json(updateTask);
  } catch (error) {
    return res.json(error);
  }
};

const deleteTask = async (req: ReqType, res: ResType) => {
  const { id } = req.body;
  if (!id) {
    return res.json(`Error: no task id was passed`);
  }

  try {
    const deletedTask = await Task.findByIdAndDelete({ _id: id });
    if (!deletedTask) {
      return res.json(`Error: couldn't find the task`);
    }

    return res.json(deletedTask);
  } catch (error) {
    return res.json(error);
  }
};

const allTask = async (req: ReqType, res: ResType) => {
  const tasks = await Task.find({});
  return res.json(tasks);
};

export { createTask, updateTask, deleteTask, allTask };
