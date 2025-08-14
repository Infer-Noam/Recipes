import { HttpError } from "@shared/types/httpError.type";

export class InternalServerError extends HttpError {
  constructor() {
    super(`Internal server error`);
  }
}
