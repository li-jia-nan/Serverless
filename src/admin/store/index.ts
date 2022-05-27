import { legacy_createStore as createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import HomeManagementReducer from './reducer/HomeManagement';

const reducer = combineReducers({
  HomeManagement: HomeManagementReducer,
});

const store = createStore(reducer, devToolsEnhancer({}));

export default store;
