import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import auth from './auth';
import csvData from './csvData';
import menuPreferences from './menuPreferences';

const reducer = combineReducers({
  auth,
  csvData,
  menuPreferences
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from './auth';
export * from './csvData';
export * from './menuPreferences';
