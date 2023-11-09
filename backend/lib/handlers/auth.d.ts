import { ReqType, ResType } from "../types/index";
declare const logOut: (_: ReqType, res: ResType) => Promise<ResType>;
declare const signUp: (req: ReqType, res: ResType) => Promise<ResType>;
declare const logIn: (req: ReqType, res: ResType) => Promise<ResType>;
export { signUp, logIn, logOut };
