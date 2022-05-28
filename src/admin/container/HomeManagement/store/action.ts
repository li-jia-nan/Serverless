import {
  ADD_PAGE_CHILDREN,
  CHANGE_SCHEMA,
  CHANGE_PAGE_CHILD,
  DELETE_PAGE_CHILD,
  CHANGE_PAGE_CHILD_POSITION,
} from './constant';

export const getChangeSchmaAction = <T = any>(schema: T) => {
  return {
    type: CHANGE_SCHEMA,
    value: schema,
  };
};

export const addPageChildrenAction = () => {
  return { type: ADD_PAGE_CHILDREN, value: {} };
};

export const addChangePageChildAction = (value: any, index: number) => {
  return { type: CHANGE_PAGE_CHILD, value, index };
};

export const addDeletePageChildAction = (index: number) => {
  return { type: DELETE_PAGE_CHILD, index };
};

export const getChangePageChildPositionAction = (oldIndex: number, newIndex: number) => {
  return { type: CHANGE_PAGE_CHILD_POSITION, oldIndex, newIndex };
};
