import { HttpStatusCode } from "@shared/enums/statusCodes/http-status-codes";
import { HttpError } from "@shared/types/httpError.type";

export class NotFoundError extends HttpError {
  constructor() {
    super(`Not found`, HttpStatusCode.NOT_FOUND);
  }
}
