export enum StatusCode {
  BAD_REQUEST = 400,
  DUPLICATE = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

export const getStatusEntry = (code: number): StatusCode | undefined =>
  Object.entries(StatusCode)
    .map(([, value]) => value)
    .find(
      (value): value is StatusCode =>
        typeof value === "number" && value === code
    );
