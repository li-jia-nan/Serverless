export const parseJsonByString = <T = Record<PropertyKey, any>>(
  str: string,
  defaultValue: Record<PropertyKey, any>
): T => {
  try {
    return JSON.parse(str);
  } catch {
    return defaultValue;
  }
};
