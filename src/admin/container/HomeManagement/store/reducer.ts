import { AnyAction, Reducer } from 'redux';
import { produce, original } from 'immer';
import { parseJsonByString } from '../../../../common/utils';
import {
  CHANGE_SCHEMA,
  ADD_PAGE_CHILDREN,
  CHANGE_PAGE_CHILD,
  DELETE_PAGE_CHILD,
  CHANGE_PAGE_CHILD_POSITION,
} from './constant';

interface InitType {
  schema: {
    name: string;
    attributes: Record<PropertyKey, any>;
    children: any[];
  };
}

const initialschema = parseJsonByString<Record<PropertyKey, any>>(window.localStorage.schema, {
  name: 'page',
  attributes: {},
  children: [],
});

const defaultState: InitType = {
  schema: initialschema as InitType['schema'],
};

const reducer: Reducer<typeof defaultState, AnyAction> = (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case CHANGE_SCHEMA:
        draft.schema = action.value;
        break;
      case ADD_PAGE_CHILDREN:
        draft.schema.children.push(action.value);
        break;
      case CHANGE_PAGE_CHILD:
        draft.schema.children.splice(action.index, 1, action.value);
        break;
      case DELETE_PAGE_CHILD:
        draft.schema.children.splice(action.index, 1);
        break;
      case CHANGE_PAGE_CHILD_POSITION:
        const { oldIndex, newIndex } = action;
        const copy = original(draft.schema.children);
        draft.schema.children.splice(oldIndex, 1);
        draft.schema.children.splice(newIndex, 0, copy?.[oldIndex]);
        break;
      default:
        break;
    }
  });
};

export default reducer;
