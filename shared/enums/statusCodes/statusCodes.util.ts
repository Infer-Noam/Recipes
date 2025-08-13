export const getStatusEntry = <T extends Record<string, string | number>>(
  enumObject: T,
  code: number
): T[keyof T] | undefined => {
  return Object.entries(enumObject)
    .map(([, value]) => value)
    .find(
      (value): value is T[keyof T] =>
        typeof value === "number" && value === code
    );
};
