import { createLogger } from "./index";
import type { ErrorRequestHandler } from "express";

const errorLogger: ErrorRequestHandler = (err, _, res, next) => {
  createLogger(`${err.name}: ${err.message}`, "errorLog.txt");
  console.error(err.stack);
  next();
};

export default errorLogger;
