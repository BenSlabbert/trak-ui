import {
  AUTH_ERROR, CLEAR_ERRORS, CLIENT_ERROR, REPORT_APP_ERROR, SERVER_ERROR
} from "../actions/error/errorTypes";

export default function (state = null, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return null;

    case REPORT_APP_ERROR:
      return { message: action.payload.message };

    case CLIENT_ERROR:
      return { message: action.payload.message };

    case SERVER_ERROR:
      return { message: action.payload.message };

    case AUTH_ERROR:
      return { message: action.payload.message };

    default:
      return state;
  }
}
