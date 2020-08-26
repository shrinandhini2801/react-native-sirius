import { combineReducers } from 'redux';
import sessionReducer from './session/reducer';

const rootReducer = combineReducers({
  sessionReducer
});
export default rootReducer;
