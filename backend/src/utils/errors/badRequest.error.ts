import { HttpStatusCode } from "@shared/enums/statusCodes/http-status-codes";
import { HttpError } from "@shared/types/httpError.type";

export class BadRequestError extends HttpError {
  constructor() {
    super("Invalid data", HttpStatusCode.BAD_REQUEST);
  }
}
