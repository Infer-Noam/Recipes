import { HttpError } from "@shared/types/httpError.type";
import type { ErrorRequestHandler } from "express";
import { BadRequestError } from "../utils/errors/badRequest.error";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { InternalServerError } from "../utils/errors/internalServer.error";
import { NotFoundError } from "../utils/errors/notFound.error";
import { QueryFailedError } from "typeorm";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err?.status ?? 500;

  const httpErrorMap = new Map<number, HttpError>([
    [400, new BadRequestError()],
    [404, new NotFoundError()],
    [409, new DuplicateError()],
    [500, new InternalServerError()],
  ]);

  let httpError;

  if (err instanceof HttpError) httpError = err;
  else httpError = httpErrorMap.get(statusCode) ?? new InternalServerError();

  res.status(httpError.status).json({ message: httpError.message });

  next();
};

export default errorHandler;
