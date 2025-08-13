import { HttpError } from "../../../../shared/types/httpError.type";

export class BadRequestError extends HttpError {
  constructor() {
    super("Invalid data", 400);
  }
}
