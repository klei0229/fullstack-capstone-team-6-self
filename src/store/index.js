import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import csvData from './csvData';
import restaurants from './restaurants';
import adminRestaurants from './admin-restaurants';
import menus from './menus';
import menu from './menu';

const reducer = combineReducers({
  auth,
  csvData,
  restaurants,
  adminRestaurants,
  menus,
  menu,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './csvData';
export * from './restaurants';
export * from './admin-restaurants';
export * from './menus';
export * from './menu';
