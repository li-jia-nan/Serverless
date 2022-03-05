export const parseJsonByString = (str: string, defaultValue: any): any => {
  try {
    return JSON.parse(str);
  } catch {}
  return defaultValue;
};
