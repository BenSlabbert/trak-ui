import { combineReducers } from 'redux';

import errorReducer from './errorReducer';
import dataReducer from './dataReducer';

export default combineReducers({
  error: errorReducer,
  data: dataReducer
});
