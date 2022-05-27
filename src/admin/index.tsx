import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import HomeManagement from './container/HomeManagement';
import store from './store';
import 'normalize.css';
import './style.scss';

ReactDOM.render(
  <Provider store={store}>
    <HomeManagement />
  </Provider>,
  document.getElementById('root')
);
