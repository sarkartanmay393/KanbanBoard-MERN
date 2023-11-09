import { IGlobalStore, ITask, IUser, TaskStatus } from "../interfaces";
import { action } from "easy-peasy";

const globalStore: IGlobalStore = {
  isLoading: true,
  error: "",
  user: null,
  tasks: [],
  columns: {
    "column-1": {
      _id: "column-1",
      name: "Not Started",
      relatedStatus: TaskStatus.NotStarted,
    },
    "column-2": {
      _id: "column-2",
      name: "In Progress",
      relatedStatus: TaskStatus.InProgress,
    },
    "column-3": {
      _id: "column-3",
      name: "Review",
      relatedStatus: TaskStatus.Review,
    },
    "column-4": {
      _id: "column-4",
      name: "Complete",
      relatedStatus: TaskStatus.Complete,
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setUser: action((state, payload: IUser | null) => {
    state.user = payload;
  }),

  setTasks: action((state, payload: ITask[]) => {
    state.tasks = payload;

    // state.tasks.forEach((task) => {
    //   const exactColumn = state.columns.find(
    //     (column) => column.relatedStatus === task.status
    //   );
    //   if (exactColumn) {
    //     exactColumn.taskIds = [task.id, ...exactColumn.taskIds];
    //     state.columns = [...state.columns, exactColumn];
    //   }
    // });
  }),

  addOneTask: action((state) => {
    const defaultTask = {
      _id: "",
      title: "",
      description: "",
      tags: [""],
      status: TaskStatus.NotStarted,
      projectId: "",
      dueDate: "",
    };

    (async () => {
      const resp = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(defaultTask),
      });
      await resp.json();
      // state.tasks = [...state.tasks, ]
    })();

    state.tasks = [...state.tasks, defaultTask];
    // const exactColumn = state.columns.find(
    //   (column) => column.relatedStatus === dummytask.status
    // );
    // if (exactColumn) {
    //   exactColumn.taskIds = ["tsx07", ...exactColumn.taskIds];
    //   state.columns = [...state.columns, exactColumn];
  }),

  removeOneTask: action((state, playload: string) => {
    (async () => {
      const resp = await fetch("/api/task/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id: playload }),
      });
      await resp.json();
    })();
    state.tasks = state.tasks.filter((task) => task._id !== playload);
  }),

  updateTask: action((state, payload: ITask) => {
    // const exactTaskBeforeUpdate = state.tasks.find(
    //   (task) => task.id === payload.id
    // );
    // state.tasks = state.tasks.map((task) =>
    //   task.id === payload.id ? payload : task
    // );
    (async () => {
      const resp = await fetch("/api/task/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      await resp.json();
    })();

    const updatedTask = state.tasks.find(
      (task) => task._id === payload._id
    ) as ITask;
    state.tasks = [...state.tasks, updatedTask];

    // const srcColumn = state.columns.find(
    //   (column) =>
    //     exactTaskBeforeUpdate &&
    //     column.relatedStatus === exactTaskBeforeUpdate.status
    // );
    // if (srcColumn) {
    //   srcColumn.taskIds = srcColumn.taskIds.filter(
    //     (taskId) => exactTaskBeforeUpdate?.id !== taskId
    //   );
    //   state.columns = [...state.columns, srcColumn];
    // }
    // const destColumn = state.columns.find(
    //   (column) => column.relatedStatus === payload.status
    // );
    // if (destColumn) {
    //   destColumn.taskIds = [payload.id, ...destColumn.taskIds];
    //   state.columns = [...state.columns, destColumn];
    // }
  }),
  setError: {
    type: "action",
    payload: "",
    result: undefined,
  },
};

export default globalStore;
