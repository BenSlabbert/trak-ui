import {
  DATA_FETCH_ALL_DEALS,
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY,
  DATA_FETCH_DAILY_DEALS,
  DATA_FETCH_DEAL_BY_ID,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT,
  DATA_LOADING,
  DATA_ADD_PRODUCT
} from "../actions/data/dataTypes";

export default function (state = null, action) {
  switch (action.type) {
    case DATA_FETCH_LATEST_PRODUCTS:
      return { latest: action.payload, isLoading: false };

    case DATA_FETCH_PRODUCT:
      return { product: action.payload, isLoading: false };

    case DATA_FETCH_BRAND:
      return { brand: action.payload, isLoading: false };

    case DATA_FETCH_CATEGORY:
      return { category: action.payload, isLoading: false };

    case DATA_FETCH_DAILY_DEALS:
      return { dailyDeals: action.payload, isLoading: false };

    case DATA_FETCH_ALL_DEALS:
      return { allDeals: action.payload, isLoading: false };

    case DATA_FETCH_DEAL_BY_ID:
      return { deal: action.payload, isLoading: false };

    case DATA_ADD_PRODUCT:
      return { addProductResp: action.payload, isLoading: false };

    case DATA_LOADING:
      return { isLoading: action.payload };

    default:
      return state;
  }
}
