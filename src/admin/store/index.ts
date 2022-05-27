import { legacy_createStore as createStore, combineReducers } from 'redux';
import HomeManagementReducer from './reducer/HomeManagement';

const reducer = combineReducers({
  HomeManagement: HomeManagementReducer,
});

const store = createStore(
  reducer /* preloadedState, */,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
