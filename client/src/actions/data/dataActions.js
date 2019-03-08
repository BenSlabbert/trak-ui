import axios from 'axios';
import { apiActionExceptionHandler } from '../../util/apiActionExceptionHandler';
import { clearAllErrors } from '..';
import { DATA_FETCH_BRAND, DATA_FETCH_LATEST_PRODUCTS, DATA_FETCH_PRODUCT, DATA_LOADING } from './dataTypes';

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

  if (!productId) throw Error('missing productId!');

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

  if (!brandId) throw Error('missing brandId!');

  try {
    const res = await axios.get(`/api/brand/${brandId}`);
    dispatch({ type: DATA_FETCH_BRAND, payload: res.data });
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
