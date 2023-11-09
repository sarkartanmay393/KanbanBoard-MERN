import { ReqTypeArrayBody, type ReqType, type ResType } from "../types/index";
declare const createTask: (req: ReqType, res: ResType) => Promise<ResType>;
declare const updateTask: (req: ReqTypeArrayBody, res: ResType) => Promise<ResType>;
declare const deleteTask: (req: ReqType, res: ResType) => Promise<ResType>;
declare const allTask: (req: ReqType, res: ResType) => Promise<ResType>;
export { createTask, updateTask, deleteTask, allTask };
