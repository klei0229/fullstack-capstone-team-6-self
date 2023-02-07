import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import csvData from './csvData';
import restaurants from './restaurants';
import menus from './menus';
import menu from './menu';
import menuPreferences from './menuPreferences';
import items from './items';
import users from './users';
import onlineUsers from './onlineUsers';

const reducer = combineReducers({
  auth,
  csvData,
  restaurants,
  menus,
  menu,
  menuPreferences,
  items,
  users,
  onlineUsers,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './csvData';
export * from './restaurants';
export * from './menus';
export * from './menu';
export * from './menuPreferences';
export * from './items';
export * from './users';
export * from './onlineUsers';
