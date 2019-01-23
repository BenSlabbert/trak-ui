import { AUTH_ERROR, CLIENT_ERROR, SERVER_ERROR } from '../actions/error/errorTypes';

export const apiActionExceptionHandler = ( e, dispatch = null ) => {
  let resp1;
  let resp2;

  const { data, status } = e.response;

  if (status === 401) {
    // logout user
    resp2 = { type: CLIENT_ERROR, payload: { message: data.message, payload: data.payload } };
    if (dispatch) {
      dispatch(resp2);
    } else {
      return [resp2];
    }

  } else if (status === 403) {
    // forbidden, not enough privileges
    resp1 = { type: AUTH_ERROR, payload: { message: data.message, payload: data.payload } };
    if (dispatch)
      dispatch(resp1);
    else
      return resp1;

  } else if (status >= 400 && status < 500) {
    resp1 = { type: CLIENT_ERROR, payload: { message: data.message, payload: data.payload } };
    if (dispatch)
      dispatch(resp1);
    else
      return resp1;

  } else {
    resp1 = { type: SERVER_ERROR, payload: { message: data.message, payload: data.payload } };
    if (dispatch)
      dispatch(resp1);
    else
      return resp1;
  }
};
