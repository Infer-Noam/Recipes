export const getStatusEntry = <T extends Record<string, string | number>>(
  enumObject: T,
  code: number
): T[keyof T] | undefined =>
  (Object.entries(enumObject) as [keyof T, T[keyof T]][]).find(
    ([, value]) => typeof value === "number" && value === code
  )?.[1];
