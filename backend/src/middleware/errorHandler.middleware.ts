import { HttpError } from "@shared/types/httpError.type";
import type { ErrorRequestHandler } from "express";
import { BadRequestError } from "../utils/errors/badRequest.error";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { InternalServerError } from "../utils/errors/internalServer.error";
import { NotFoundError } from "../utils/errors/notFound.error";
import {
  getHttpStatusEntry,
  HttpStatusCode,
} from "@shared/enums/statusCodes/http-status-codes";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    getHttpStatusEntry(err?.status) ?? HttpStatusCode.INTERNAL_SERVER_ERROR;

  const httpErrors: Record<HttpStatusCode, HttpError> = {
    [HttpStatusCode.BAD_REQUEST]: new BadRequestError(),
    [HttpStatusCode.NOT_FOUND]: new NotFoundError(),
    [HttpStatusCode.DUPLICATE]: new DuplicateError(),
    [HttpStatusCode.INTERNAL_SERVER_ERROR]: new InternalServerError(),
  };

  const httpError = err instanceof HttpError ? err : httpErrors[statusCode];

  res.status(httpError.status).json({ message: httpError.message });

  next();
};

export default errorHandler;
