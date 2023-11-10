import {
  IColumn,
  IGlobalStore,
  IPair,
  ITask,
  IUser,
  TaskStatus,
} from "../interfaces";
import { action } from "easy-peasy";

const globalStore: IGlobalStore = {
  isLoading: true,
  error: "",
  user: null,
  // tasks: new Set<ITask>(),
  columns: {
    "column-1": {
      _id: "column-1",
      name: "Not Started",
      relatedStatus: TaskStatus.NotStarted,
      tasks: new Set(),
    },
    "column-2": {
      _id: "column-2",
      name: "In Progress",
      relatedStatus: TaskStatus.InProgress,
      tasks: new Set(),
    },
    "column-3": {
      _id: "column-3",
      name: "Review",
      relatedStatus: TaskStatus.Review,
      tasks: new Set(),
    },
    "column-4": {
      _id: "column-4",
      name: "Complete",
      relatedStatus: TaskStatus.Complete,
      tasks: new Set(),
    },
  },
  columnOrder: ["column-1", "column-2", "column-3", "column-4"],

  setIsLoading: action((state, payload) => {
    state.isLoading = payload;
  }),

  setUser: action((state, payload: IUser | null) => {
    state.user = payload;
  }),

  setTasks: action((state, payload: Set<ITask>) => {
    [...payload].forEach((task) => {
      setTaskInColumn(state.columns, task);
    });
  }),

  addTask: action((state, payload: ITask) => {
    state.columns["column-1"].tasks.add(payload);
  }),

  removeTask: action((state, playload: ITask) => {
    removeTaskInColumn(state.columns, playload);
  }),

  updateTask: action((state, payload: ITask) => {
    // const prevTaskBody = [...state.globalTaskStore].find(
    //   (task) => task._id === payload.task._id
    // );

    console.log(payload);

    // switch (prevTaskBody?.status) {
    //   case TaskStatus.NotStarted: {
    //     state.columns["column-1"].tasks.delete(prevTaskBody);
    //     break;
    //   }
    //   case TaskStatus.InProgress: {
    //     break;
    //   }
    //   case TaskStatus.Review: {
    //     break;
    //   }
    //   case TaskStatus.Complete: {
    //     break;
    //   }
    // }
  }),
  setError: {
    type: "action",
    payload: "",
    result: undefined,
  },

  globalTaskStore: new Set(),
  setGlobalaTaskStore: action((state, payload) => {
    if (!payload) {
      let allTasks = [...state.columns[state.columnOrder[0]].tasks];
      state.columnOrder.forEach((columnId) => {
        allTasks = [...state.columns[columnId].tasks, ...allTasks];
      });
      state.globalTaskStore = new Set([...allTasks]);
    } else {
      state.globalTaskStore = payload;
    }

    // console.log(state.globalTaskStore);
  }),
};

export default globalStore;

const removeTaskInColumn = (columns: IPair<IColumn>, task: ITask) => {
  switch (task.status) {
    case TaskStatus.NotStarted: {
      columns["column-1"].tasks.delete(task);
      break;
    }
    case TaskStatus.InProgress: {
      columns["column-2"].tasks.delete(task);
      break;
    }
    case TaskStatus.Review: {
      columns["column-3"].tasks.delete(task);
      break;
    }
    case TaskStatus.Complete: {
      columns["column-4"].tasks.delete(task);
      break;
    }
  }
};
const setTaskInColumn = (columns: IPair<IColumn>, task: ITask) => {
  switch (task.status) {
    case TaskStatus.NotStarted: {
      columns["column-1"].tasks.add(task);
      break;
    }
    case TaskStatus.InProgress: {
      columns["column-2"].tasks.add(task);
      break;
    }
    case TaskStatus.Review: {
      columns["column-3"].tasks.add(task);
      break;
    }
    case TaskStatus.Complete: {
      columns["column-4"].tasks.add(task);
      break;
    }
  }
};
