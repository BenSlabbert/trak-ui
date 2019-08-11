import axios from "axios";
import { apiActionExceptionHandler } from "../../util/apiActionExceptionHandler";
import { clearAllErrors } from "../index";
import {
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY,
  DATA_FETCH_DAILY_DEALS,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT,
  DATA_LOADING
} from "./dataTypes";

export const dataLoadingStop = () => {
  return { type: DATA_LOADING, payload: false };
};

export const fetchLatestProducts = () => async dispatch => {
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/latest`);
    dispatch({ type: DATA_FETCH_LATEST_PRODUCTS, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchProduct = (productId = null) => async dispatch => {
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  if (!productId) throw Error("missing productId!");

  try {
    const res = await axios.get(`/api/product/${productId}`);
    dispatch({ type: DATA_FETCH_PRODUCT, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchBrand = (brandId = null) => async dispatch => {
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  if (!brandId) throw Error("missing brandId!");

  try {
    const res = await axios.get(`/api/brand/${brandId}`);
    dispatch({ type: DATA_FETCH_BRAND, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchCategory = (categoryId = null) => async dispatch => {
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  if (!categoryId) throw Error("missing categoryId!");

  try {
    const res = await axios.get(`/api/category/${categoryId}`);
    dispatch({ type: DATA_FETCH_CATEGORY, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchDailyDeals = (page = null) => async dispatch => {
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  try {
    if (!page) {
      page = 1;
    }
    console.log(`/api/daily-deals?page=${page}`);

    const res = await axios.get(`/api/daily-deals?page=${page}`);
    dispatch({ type: DATA_FETCH_DAILY_DEALS, payload: res.data });
  } catch (e) {
    console.log("error", e);
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
