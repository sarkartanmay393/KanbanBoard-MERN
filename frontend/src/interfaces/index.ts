import { Action } from "easy-peasy";

export interface PairType {
  [key: string]: string;
}

export interface TaskType {
  id: string;
  name: string;
  content: string;
}

export interface ColumnType {
  id: string;
  name: string;
  taskIds: string[];
}

export interface GlobalStore {
  tasks: TaskType[];
  columns: ColumnType[];
  columnOrder: string[];
  setTasks: Action<GlobalStore, TaskType[]>;
  setColumns: Action<GlobalStore, ColumnType[]>;
  setColumnOrder: Action<GlobalStore, string[]>;
}
