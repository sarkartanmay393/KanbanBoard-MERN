import { Request, Response } from "express";
import { ParsedQs } from "qs";

type ReqType = Request<
  Record<string, string>,
  any,
  Record<string, string>,
  ParsedQs
>;
type ResType = Response;

export { ReqType, ResType };
