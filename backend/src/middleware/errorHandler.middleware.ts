import { HttpError } from "@shared/types/httpError.type";
import type { ErrorRequestHandler } from "express";
import {
  getHttpStatusEntry,
  HttpStatusCode,
} from "@shared/enums/statusCodes/http-status-codes";
import { HTTP_ERRORS } from "../utils/const/httpErrors.const";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    getHttpStatusEntry(err?.status) ?? HttpStatusCode.INTERNAL_SERVER_ERROR;

  const httpError = err instanceof HttpError ? err : HTTP_ERRORS[statusCode];

  res.status(httpError.status).json({ message: httpError.message });

  next();
};

export default errorHandler;
