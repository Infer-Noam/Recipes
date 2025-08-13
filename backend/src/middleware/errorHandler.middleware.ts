import { HttpError } from "@shared/types/httpError.type";
import type { ErrorRequestHandler } from "express";
import { BadRequestError } from "../utils/errors/badRequest.error";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { InternalServerError } from "../utils/errors/internalServer.error";
import { NotFoundError } from "../utils/errors/notFound.error";
import { getStatusEntry, StatusCode } from "@shared/enums/status-codes";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    getStatusEntry(err?.status) ?? StatusCode.INTERNAL_SERVER_ERROR;

  const httpErrors: Record<StatusCode, HttpError> = {
    [StatusCode.BAD_REQUEST]: new BadRequestError(),
    [StatusCode.NOT_FOUND]: new NotFoundError(),
    [StatusCode.DUPLICATE]: new DuplicateError(),
    [StatusCode.INTERNAL_SERVER_ERROR]: new InternalServerError(),
  };

  const httpError = err instanceof HttpError ? err : httpErrors[statusCode];

  res.status(httpError.status).json({ message: httpError.message });

  next();
};

export default errorHandler;
