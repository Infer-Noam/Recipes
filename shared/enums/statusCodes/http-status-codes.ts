import { getStatusEntry } from "./statusCodes.util";

export enum HttpStatusCode {
  BAD_REQUEST = 400,
  DUPLICATE = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

export const getHttpStatusEntry = (code: number): HttpStatusCode | undefined =>
  getStatusEntry(HttpStatusCode, code);
