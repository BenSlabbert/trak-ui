import axios from "axios";
import { apiActionExceptionHandler } from "../../util/apiActionExceptionHandler";
import { clearAllErrors } from "..";
import {
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY, DATA_FETCH_DAILY_DEALS,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT,
  DATA_LOADING,
  DATA_ADD_PRODUCT
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

export const fetchDailyDeals = () => async dispatch => {

  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  try {
    const res = await axios.get("/api/daily-deals");
    dispatch({ type: DATA_FETCH_DAILY_DEALS, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const addProduct = (productId = null) => async dispatch => {
  if (!productId) throw Error('missing productId!');
  dispatch(clearAllErrors());
  dispatch({ type: DATA_LOADING, payload: true });

  try {
    const res = await axios.post(`/api/add/`, { productId });
    dispatch({ type: DATA_ADD_PRODUCT, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
