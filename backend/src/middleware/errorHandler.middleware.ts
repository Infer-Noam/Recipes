import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, _, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err?.status ?? 500;
  const message = err instanceof Error ? err.message : "Unknown error occurred";
  res.status(statusCode).json({ message });

  next();
};

export default errorHandler;
