import { legacy_createStore as createStore, combineReducers } from 'redux';
import HomeManagementReducer from './reducer/HomeManagement';

const reducer = combineReducers({
  HomeManagement: HomeManagementReducer,
});

const store = createStore(reducer);

export default store;
