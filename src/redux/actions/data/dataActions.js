import axios from "axios";
import { apiActionExceptionHandler } from "../../../util/apiActionExceptionHandler";
import { clearAllErrors } from "../error/errorActions";
import {
  DATA_FETCH_ALL_DEALS,
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY,
  DATA_FETCH_DAILY_DEALS,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT,
  DATA_LOADING,
  DATA_FETCH_DEAL_BY_ID
} from "./dataTypes";

export const dataLoadingStop = () => ({
  type: DATA_LOADING,
  payload: false
});

export const fetchLatestProducts = () => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  try {
    const res = await axios.get(`/api/latest`);
    dispatch({
      type: DATA_FETCH_LATEST_PRODUCTS,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchProduct = (productId = null) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!productId) throw Error("Missing productId!");

  try {
    const res = await axios.get(`/api/product/${productId}`);
    dispatch({
      type: DATA_FETCH_PRODUCT,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchBrand = (brandId = null) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!brandId) throw Error("Missing brandId!");

  try {
    const res = await axios.get(`/api/brand/${brandId}`);
    dispatch({
      type: DATA_FETCH_BRAND,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchCategory = (categoryId = null) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!categoryId) throw Error("Missing categoryId!");

  try {
    const res = await axios.get(`/api/category/${categoryId}`);
    dispatch({
      type: DATA_FETCH_CATEGORY,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchDailyDeals = (page = 1) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  try {
    const res = await axios.get(`/api/daily-deals?page=${page}`);
    dispatch({
      type: DATA_FETCH_DAILY_DEALS,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchAllDeals = (page = 1) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  try {
    const res = await axios.get(`/api/all-promotions?page=${page}`);
    dispatch({
      type: DATA_FETCH_ALL_DEALS,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchDeal = (id = null, page = 1) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!id) throw Error("Missing promotionId!");

  try {
    const res = await axios.get(`/api/promotion?id=${id}&page=${page}`);
    dispatch({
      type: DATA_FETCH_DEAL_BY_ID,
      payload: res.data
    });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
