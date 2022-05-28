import { CHANGE_SCHEMA } from './constant';

export const getChangeSchmaAction = <T = any>(schema: T) => {
  return {
    type: CHANGE_SCHEMA,
    value: schema,
  };
};
