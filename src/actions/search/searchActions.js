import axios from "axios";
import { apiActionExceptionHandler } from "../../util/apiActionExceptionHandler";
import { clearAllErrors } from "../index";
import { SEARCH_PRODUCTS, SEARCH_LOADING, SEARCH_BRANDS, SEARCH_CATEGORIES } from "./searchTypes";
import { DATA_LOADING } from "../data/dataTypes";

export const searchLoadingStop = () => {
  return { type: DATA_LOADING, payload: false };
};

export const fetchSearchProducts = (search = null) => async dispatch => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/product?s=${search}`);
    dispatch({ type: SEARCH_PRODUCTS, payload: res.data });
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchSearchBrands = (search = null) => async dispatch => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/brand?s=${search}`);
    dispatch({ type: SEARCH_BRANDS, payload: res.data });
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchSearchCategories = (search = null) => async dispatch => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/category?s=${search}`);
    dispatch({ type: SEARCH_CATEGORIES, payload: res.data });
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
