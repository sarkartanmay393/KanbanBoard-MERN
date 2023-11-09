import { IGlobalStore, ITask, IUser, TaskStatus } from "../interfaces";
import { action } from "easy-peasy";

interface ITaskPayload extends ITask {
  _id: string;
}

const globalStore: IGlobalStore = {
  isLoading: true,
  error: "",
  user: null,
  tasks: [],
  columns: [
    {
      id: "column-1",
      name: "Not Started",
      taskIds: [],
      relatedStatus: TaskStatus.NotStarted,
    },
    {
      id: "column-2",
      name: "In Progress",
      taskIds: [],
      relatedStatus: TaskStatus.InProgress,
    },
    {
      id: "column-3",
      name: "Review",
      taskIds: [],
      relatedStatus: TaskStatus.Review,
    },
    {
      id: "column-4",
      name: "Complete",
      taskIds: [""],
      relatedStatus: TaskStatus.Complete,
    },
  ],
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setUser: action((state, payload: IUser | null) => {
    state.user = payload;
  }),
  setTasks: action((state, payload: ITaskPayload[]) => {
    state.tasks = payload.map((task) => ({
      ...task,
      id: task._id,
    }));

    state.tasks.forEach((task) => {
      const exactColumn = state.columns.find(
        (column) => column.relatedStatus === task.status
      );
      if (exactColumn) {
        exactColumn.taskIds = [task.id, ...exactColumn.taskIds];
        state.columns = [...state.columns, exactColumn];
      }
    });
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
  addOneTask: action((state, payload: ITask) => {
    let dummytask = {
      title: payload.title || "Demo task",
      description: payload.description,
      tags: payload.tags,
      status: payload.status,
      projectId: payload.projectId,
      dueDate: payload.dueDate,
    };
    (async () => {
      const resp = await fetch("/api/task/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dummytask),
      });
      await resp.json();
    })();

    state.tasks = [
      ...state.tasks,
      Object.create({ ...dummytask, id: "tsx07" }),
    ];
    const exactColumn = state.columns.find(
      (column) => column.relatedStatus === dummytask.status
    );
    if (exactColumn) {
      exactColumn.taskIds = ["tsx07", ...exactColumn.taskIds];
      state.columns = [...state.columns, exactColumn];
    }
  }),
  removeOneTask: action((state, playload: string) => {
    const deleteTaskFromDatabase = async () => {
      const resp = await fetch("/api/task/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: playload }),
      });
    };
    deleteTaskFromDatabase();
    state.tasks = state.tasks.filter((task) => task.id !== playload);
  }),
  updateTask: action((state, payload: ITask) => {
    const exactTaskBeforeUpdate = state.tasks.find(
      (task) => task.id === payload.id
    );
    state.tasks = state.tasks.map((task) =>
      task.id === payload.id ? payload : task
    );
    const syncDatabaseWithRedux = async () => {
      const resp = await fetch("/api/task/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...payload }),
      });
      const res = await resp.json();
      return res;
    };
    syncDatabaseWithRedux();

    const srcColumn = state.columns.find(
      (column) =>
        exactTaskBeforeUpdate &&
        column.relatedStatus === exactTaskBeforeUpdate.status
    );
    if (srcColumn) {
      srcColumn.taskIds = srcColumn.taskIds.filter(
        (taskId) => exactTaskBeforeUpdate?.id !== taskId
      );
      state.columns = [...state.columns, srcColumn];
    }

    const destColumn = state.columns.find(
      (column) => column.relatedStatus === payload.status
    );
    if (destColumn) {
      destColumn.taskIds = [payload.id, ...destColumn.taskIds];
      state.columns = [...state.columns, destColumn];
    }
  }),
  addTaskToColumn: action((state, payload) => {}),
  setError: {
    type: "action",
    payload: "",
    result: undefined,
  },
};

export default globalStore;
