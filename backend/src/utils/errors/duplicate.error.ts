import { HttpStatusCode } from "@shared/enums/statusCodes/http-status-codes";
import { HttpError } from "@shared/types/httpError.type";

export class DuplicateError extends HttpError {
  constructor() {
    super("Please check for duplicate values.", HttpStatusCode.DUPLICATE);
  }
}
