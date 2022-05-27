import { Reducer } from 'redux';

const defaultSchame = {
  name: 'page',
  attributes: {},
  children: [],
};

const reducer: Reducer<typeof defaultSchame> = (state = defaultSchame, action) => {
  return state;
};

export default reducer;
