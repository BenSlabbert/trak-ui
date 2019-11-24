import axios from "axios";
import pb from "trak-gRPC/gen/js/proto/gateway/gateway_api_pb";
import { apiActionExceptionHandler } from "../../../util/apiActionExceptionHandler";
import { pageAllDeals, pageDailyDeals } from "../pagination/paginationActions";
import { clearAllErrors } from "../error/errorActions";
import {
  DATA_ADD_PRODUCT,
  DATA_FETCH_ALL_DEALS,
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY,
  DATA_FETCH_DAILY_DEALS,
  DATA_FETCH_DEAL_BY_ID,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT,
  DATA_LOADING
} from "./dataTypes";
import { BinaryRequestConfig, dispatchProto } from "../util";

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
    const res = await axios.get(`/api/latest`, BinaryRequestConfig);
    dispatchProto(pb.LatestResponse, res.data, dispatch, DATA_FETCH_LATEST_PRODUCTS);
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
    const res = await axios.get(`/api/product/${productId}`, BinaryRequestConfig);
    dispatchProto(pb.ProductResponse, res.data, dispatch, DATA_FETCH_PRODUCT);
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
    const res = await axios.get(`/api/brand/${brandId}`, BinaryRequestConfig);
    dispatchProto(pb.BrandResponse, res.data, dispatch, DATA_FETCH_BRAND);
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
    const res = await axios.get(`/api/category/${categoryId}`, BinaryRequestConfig);
    dispatchProto(pb.CategoryResponse, res.data, dispatch, DATA_FETCH_CATEGORY);
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
    dispatch(pageDailyDeals(page));
    const res = await axios.get(`/api/daily-deals?page=${page}`, BinaryRequestConfig);
    dispatchProto(pb.PromotionResponse, res.data, dispatch, DATA_FETCH_DAILY_DEALS);
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
    const res = await axios.get(`/api/all-promotions?page=${page}`, BinaryRequestConfig);
    dispatch(pageAllDeals(page));
    dispatchProto(pb.GetAllPromotionsResponse, res.data, dispatch, DATA_FETCH_ALL_DEALS);
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchDeal = (page = 1, id = null) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!id) throw Error("Missing promotionId!");

  try {
    const res = await axios.get(`/api/promotion?id=${id}&page=${page}`, BinaryRequestConfig);
    dispatchProto(pb.PromotionResponse, res.data, dispatch, DATA_FETCH_DEAL_BY_ID);
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const addProduct = (url = null, history = null) => async (dispatch) => {
  dispatch(clearAllErrors());
  dispatch({
    type: DATA_LOADING,
    payload: true
  });

  if (!url) throw Error("Missing url!");
  if (!history) throw Error("Missing history!");

  try {
    const addProductRequest = new pb.AddProductRequest();
    addProductRequest.setUrl(url);
    const binary = addProductRequest.serializeBinary();
    const res = await axios.post(`/api/add-product?url=${url}`,
      binary, {
        headers: {
          'Content-Type': `application/octet-stream`
        },
        timeout: 30000
      });
    dispatch({
      type: DATA_ADD_PRODUCT,
      payload: res.data
    });
    history.push('/');
  } catch (e) {
    dispatch(dataLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
