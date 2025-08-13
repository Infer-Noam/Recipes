import type { ErrorRequestHandler } from "express";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { QueryFailedError } from "typeorm";
import { InternalServerError } from "src/utils/errors/internalServer.error";

const typeormErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof QueryFailedError) {
    if ((err as any).code === "23505") {
      next(new DuplicateError());
    } else {
      next(new InternalServerError());
    }
  }

  next(err);
};

export default typeormErrorHandler;
