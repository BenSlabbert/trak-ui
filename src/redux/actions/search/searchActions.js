import axios from "axios";
import pb from "trak-gRPC/gen/js/proto/search/search_api_pb";
import { apiActionExceptionHandler } from "../../../util/apiActionExceptionHandler";
import { clearAllErrors } from "../error/errorActions";
import {
  SEARCH_BRANDS,
  SEARCH_CATEGORIES,
  SEARCH_LOADING,
  SEARCH_PRODUCTS
} from "./searchTypes";
import { DATA_LOADING } from "../data/dataTypes";
import { BinaryRequestConfig, dispatchProto } from "../util";

export const searchLoadingStop = () => ({ type: DATA_LOADING, payload: false });

export const fetchSearchProducts = (search = null) => async (dispatch) => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/product?s=${search}`, BinaryRequestConfig);
    dispatchProto(pb.ProductSearchResponse, res.data, dispatch, SEARCH_PRODUCTS);
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchSearchBrands = (search = null) => async (dispatch) => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/brand?s=${search}`, BinaryRequestConfig);
    dispatchProto(pb.BrandSearchResponse, res.data, dispatch, SEARCH_BRANDS);
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};

export const fetchSearchCategories = (search = null) => async (dispatch) => {
  dispatch(clearAllErrors());

  if (!search) {
    return;
  }

  dispatch({ type: SEARCH_LOADING, payload: true });

  try {
    const res = await axios.get(`/api/search/category?s=${search}`, BinaryRequestConfig);
    dispatchProto(pb.CategorySearchResponse, res.data, dispatch, SEARCH_CATEGORIES);
  } catch (e) {
    dispatch(searchLoadingStop());
    apiActionExceptionHandler(e, dispatch);
  }
};
