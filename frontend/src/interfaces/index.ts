import { Action } from "easy-peasy";

export enum TaskStatus {
  NotStarted = "notstarted",
  InProgress = "inprogress",
  Review = "review",
  Complete = "complete",
}

export interface IPair {
  [key: string]: string;
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  projectIds: string[];
  taskIds: string[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  tags: string[];
  status: TaskStatus;
  projectId: string;
  dueDate: string;
}

export interface IColumn {
  id: string;
  name: string;
  taskIds: string[];
  relatedStatus: TaskStatus;
}

interface addTaskToColumnPayload {
  status: TaskStatus;
  columnId: string;
}

export interface IUser {
  id: string;
  email: string;
  username: string;
  taskIds: string[];
  projectIds: string[];
}

export interface IGlobalStore {
  isLoading: Boolean;
  error: string;
  user: IUser | null;
  tasks: ITask[];
  columns: IColumn[];
  columnOrder: string[];

  setIsLoading: Action<IGlobalStore, boolean>;
  setError: Action<IGlobalStore, string>;
  setUser: Action<IGlobalStore, IUser | null>;
  setTasks: Action<IGlobalStore, ITask[]>;
  setColumns: Action<IGlobalStore, IColumn[]>;
  setColumnOrder: Action<IGlobalStore, string[]>;

  addOneTask: Action<IGlobalStore, ITask>;
  removeOneTask: Action<IGlobalStore, string>;
  updateTask: Action<IGlobalStore, ITask>;

  addTaskToColumn: Action<IGlobalStore, addTaskToColumnPayload>;

  // syncStateData: Action<IGlobalStore>;
}

export interface IWebWorker {
  postMessage(data: any): void;
  addEventListener(type: string, listener: (event: any) => void): void;
  removeEventListener(type: string, listener: (event: any) => void): void;
}
