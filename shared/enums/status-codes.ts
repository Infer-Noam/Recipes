export enum StatusCode {
  BAD_REQUEST = 400,
  DUPLICATE = 409,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

export const getStatusEntry = (code: number): StatusCode | undefined => {
  for (const key of Object.keys(StatusCode) as Array<keyof typeof StatusCode>) {
    if (StatusCode[key] === code) {
      return StatusCode[key];
    }
  }
  return undefined;
};
