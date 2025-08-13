import type { ErrorRequestHandler } from "express";
import { DuplicateError } from "../utils/errors/duplicate.error";
import { QueryFailedError } from "typeorm";

const typeormErrorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (err instanceof QueryFailedError) {
    switch ((err as any).code) {
      case "23505":
        return next(new DuplicateError());
    }
  }

  next(err);
};

export default typeormErrorHandler;
