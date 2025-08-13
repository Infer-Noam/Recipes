import { HttpError } from "../../../../shared/types/httpError.type";

export class DuplicateError extends HttpError {
  constructor() {
    super("Please check for duplicate values.", 409);
  }
}
