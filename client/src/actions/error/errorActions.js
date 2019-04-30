import axios from "axios";
import { CLEAR_ERRORS, ERROR_LOADING, REPORT_APP_ERROR } from "./errorTypes";

export const errorLoadingStop = () => {
  return { type: ERROR_LOADING, payload: false };
};

export const clearAllErrors = () => {
  return { type: CLEAR_ERRORS, payload: null };
};

export const reportError = (error) => async dispatch => {

  dispatch({ type: ERROR_LOADING, payload: true });

  try {
    const res = await axios.post("/api/error", { error });
    dispatch({ type: REPORT_APP_ERROR, payload: res.data });
  } catch (e) {
    dispatch(errorLoadingStop());
    console.error("Something really bad has happened...");
  }
};
