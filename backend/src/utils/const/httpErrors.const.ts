import { HttpStatusCode } from "@shared/enums/statusCodes/http-status-codes";
import { HttpError } from "@shared/types/httpError.type";
import { BadRequestError } from "../errors/badRequest.error";
import { DuplicateError } from "../errors/duplicate.error";
import { InternalServerError } from "../errors/internalServer.error";
import { NotFoundError } from "../errors/notFound.error";

export const HTTP_ERRORS: Record<HttpStatusCode, HttpError> = {
  [HttpStatusCode.BAD_REQUEST]: new BadRequestError(),
  [HttpStatusCode.NOT_FOUND]: new NotFoundError(),
  [HttpStatusCode.DUPLICATE]: new DuplicateError(),
  [HttpStatusCode.INTERNAL_SERVER_ERROR]: new InternalServerError(),
};
