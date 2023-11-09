import { Action } from "easy-peasy";

export enum TaskStatus {
  NotStarted = "notstarted",
  InProgress = "inprogress",
  Review = "review",
  Complete = "complete",
}

export interface IPair<T> {
  [key: string]: T;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  projectIds: string[];
  taskIds: string[];
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  status: TaskStatus;
  projectId: string;
  dueDate: string;
}

export interface IColumn {
  _id: string;
  name: string;
  relatedStatus: TaskStatus;
}

export interface IGlobalStore {
  // state variables
  isLoading: Boolean;
  error: string;
  user: IUser | null;
  tasks: ITask[];
  readonly columns: IPair<IColumn>;
  readonly columnOrder: string[];

  // data fetching
  setIsLoading: Action<IGlobalStore, boolean>;
  setError: Action<IGlobalStore, string>;
  setUser: Action<IGlobalStore, IUser | null>;
  setTasks: Action<IGlobalStore, ITask[]>;

  // Task management
  addOneTask: Action<IGlobalStore>;
  removeOneTask: Action<IGlobalStore, string>;
  updateTask: Action<IGlobalStore, ITask>;

  //  utils
}

// export interface IWebWorker {
//   postMessage(data: any): void;
//   addEventListener(type: string, listener: (event: any) => void): void;
//   removeEventListener(type: string, listener: (event: any) => void): void;
// }
