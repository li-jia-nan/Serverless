import { Reducer } from 'redux';
import { produce } from 'immer';

const defaultSchame = {
  schema: {
    name: 'page',
    attributes: {},
    children: [],
  },
};

const reducer: Reducer<typeof defaultSchame> = (state = defaultSchame, action) => {
  return produce(state, draft => {});
};

export default reducer;
