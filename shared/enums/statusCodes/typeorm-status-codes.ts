import { getStatusEntry } from "./statusCodes.util";

export enum TypeormStatusCode {
  UNIQUE = 23505,
}

export const getTypeormStatusEntry = (
  code: number
): TypeormStatusCode | undefined => getStatusEntry(TypeormStatusCode, code);
