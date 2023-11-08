import { GlobalStore, TaskType } from "../interfaces";
import { action } from "easy-peasy";

const globalStore: GlobalStore = {
  tasks: [
    { id: "task-1", name: "Task 1", content: "Do random 1" },
    { id: "task-2", name: "Task 2", content: "Do random 2" },
    { id: "task-3", name: "Task 3", content: "Do random 3" },
    { id: "task-4", name: "Task 4", content: "Do random 4" },
  ],
  columns: [
    {
      id: "column-1",
      name: "Not Started",
      taskIds: ["task-1", "task-2", "task-3", "task-4"],
    },
    {
      id: "column-2",
      name: "In Progress",
      taskIds: [""],
    },
    {
      id: "column-3",
      name: "Review",
      taskIds: [""],
    },
    {
      id: "column-4",
      name: "Complete",
      taskIds: [""],
    },
  ],
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],

  setTasks: action((state, payload: TaskType[]) => {
    state.tasks = payload;
  }),
  setColumns: {
    type: "action",
    payload: [],
    result: undefined,
  },
  setColumnOrder: {
    type: "action",
    payload: [],
    result: undefined,
  },
};

export default globalStore;
