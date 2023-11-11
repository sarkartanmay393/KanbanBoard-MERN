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
  tasks: null,
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
    let localTasksVar: IPair<ITask> = {};

    [...payload].forEach((task) => {
      const pair = {
        [task._id]: task,
      } as IPair<ITask>;
      localTasksVar = {
        ...localTasksVar,
        ...pair,
      };
    });

    state.tasks = localTasksVar;
  }),

  addTask: action((state, payload: ITask) => {
    state.tasks = {
      payload,
      ...state.tasks,
    };
  }),

  removeTask: action((state, playload: ITask) => {
    if (state.tasks === null) {
      return;
    }

    const filteredTasks = Object.values(state.tasks).filter(
      (task) => task._id !== playload._id
    );

    let localTasksVar: IPair<ITask> = {};
    filteredTasks.forEach((task) => {
      const pair = {
        [task._id]: task,
      } as IPair<ITask>;
      localTasksVar = {
        ...localTasksVar,
        ...pair,
      };
    });

    state.tasks = localTasksVar;
  }),

  updateTask: action((state, payload: ITask) => {
    if (state.tasks) state.tasks[payload._id] = payload;
  }),

  setError: action((state, payload) => {
    state.error = payload;
  }),

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
  }),
};

export default globalStore;

const updateTaskInColumn = (columns: IPair<IColumn>, task: ITask) => {
  switch (task.status) {
    case TaskStatus.NotStarted: {
      // columns["column-1"].tasks.forEach((ts, ts2, set) => {
      console.log(task);
      //   console.log(ts2._id);
      // });
      // columns["column-1"].tasks.break;
      break;
    }
    case TaskStatus.InProgress: {
      const column = columns["column-2"];
      const prevTask = [...column.tasks].find(
        (prevTask) => prevTask._id === task._id
      );
      if (prevTask) {
        column.tasks.delete(prevTask);
      }
      column.tasks.add(task);
      break;
    }
    case TaskStatus.Review: {
      const column = columns["column-3"];
      const prevTask = [...column.tasks].find(
        (prevTask) => prevTask._id === task._id
      );
      if (prevTask) {
        column.tasks.delete(prevTask);
      }
      column.tasks.add(task);
      break;
    }
    case TaskStatus.Complete: {
      const column = columns["column-4"];
      const prevTask = [...column.tasks].find(
        (prevTask) => prevTask._id === task._id
      );
      if (prevTask) {
        column.tasks.delete(prevTask);
      }
      column.tasks.add(task);
      break;
    }
  }
};

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
