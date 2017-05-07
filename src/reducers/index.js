import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import accounts from './accounts';

const rootReducer = combineReducers({
  accounts,
  routing: routerReducer
});

export default rootReducer;
