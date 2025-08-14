import type { ErrorRequestHandler } from "express";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { QueryFailedError } from "typeorm";
import { InternalServerError } from "../utils/errors/internalServer.error";
import {
  TypeormStatusCode,
  getTypeormStatusEntry,
} from "@shared/enums/statusCodes/typeorm-status-codes";
import { HttpError } from "@shared/types/httpError.type";

const typeormErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
  const httpErrors: Record<TypeormStatusCode, HttpError> = {
    [TypeormStatusCode.UNIQUE]: new DuplicateError(),
  };

  if (err instanceof QueryFailedError) {
    const typeormStatusCode = getTypeormStatusEntry(Number((err as any).code));
    const error =
      (typeormStatusCode && httpErrors[typeormStatusCode]) ??
      new InternalServerError();
    next(error);
  }

  next(err);
};

export default typeormErrorHandler;
