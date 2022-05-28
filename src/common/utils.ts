export const parseJsonByString = <T = Record<PropertyKey, any>>(
  str: string,
  defaultValue: T
): T => {
  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
};
