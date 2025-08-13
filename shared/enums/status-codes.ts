export enum StatusCode {
  BAD_REQUEST = 400,
  DUPLICATE = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

export const getStatusEntry = (code: number): StatusCode | undefined => {
  const numericStatusCodes = Object.values(StatusCode).filter(
    (value): value is StatusCode => typeof value === "number"
  );
  return numericStatusCodes.includes(code)
    ? numericStatusCodes.find((value) => value === code)
    : undefined;
};
