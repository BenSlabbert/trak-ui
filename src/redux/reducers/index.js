import { combineReducers } from "redux";
import { reducer as reduxForm } from "redux-form";

import errorReducer from "./errorReducer";
import dataReducer from "./dataReducer";
import searchReducer from "./searchReducer";
import paginationReducer from "./paginationReducer";

export default combineReducers({
  error: errorReducer,
  data: dataReducer,
  search: searchReducer,
  pagination: paginationReducer,
  form: reduxForm
});
