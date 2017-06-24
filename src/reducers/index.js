import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import accounts from './accounts';
import timers from './timers';

const rootReducer = combineReducers({
  accounts,
  timers,
  routing: routerReducer
});

export default rootReducer;
