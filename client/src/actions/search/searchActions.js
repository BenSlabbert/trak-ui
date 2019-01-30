import axios from 'axios';

import { apiActionExceptionHandler } from '../../util/apiActionExceptionHandler';
import { clearAllErrors } from '..';
import { SEARCH, SEARCH_LOADING } from "./searchTypes";
import { DATA_LOADING } from "../data/dataTypes";

export const searchLoadingStop = () => {
  return { type: DATA_LOADING, payload: false };
};

export const fetchSearch = (search = null) => async dispatch => {

  dispatch(clearAllErrors());

  if(!search){
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search?s=${search}`);
    dispatch({ type: SEARCH, payload: res.data });
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};