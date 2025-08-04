import { HttpError } from "../../../../shared/types/httpError.type";

export class NotFoundError extends HttpError {
  constructor(entity: string) {
    super(`${entity} not found`, 404);
  }
}
