import { AnyAction, Reducer } from 'redux';
import { produce } from 'immer';
import { parseJsonByString } from '../../../common/utils';

const initialschema = parseJsonByString<Record<PropertyKey, any>>(window.localStorage.schema, {
  name: 'page',
  attributes: {},
  children: [],
});

const defaultState = {
  schema: initialschema,
};

const reducer: Reducer<typeof defaultState, AnyAction> = (state = defaultState, action) => {
  return produce(state, draft => {
    switch (action.type) {
      case 'CHANGE_SCHEMA':
        draft.schema = action.value;
        break;
      default:
        break;
    }
  });
};

export default reducer;
