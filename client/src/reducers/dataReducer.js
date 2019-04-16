import {
  DATA_FETCH_BRAND,
  DATA_FETCH_CATEGORY,
  DATA_FETCH_LATEST_PRODUCTS,
  DATA_FETCH_PRODUCT
} from "../actions/data/dataTypes";

export default function(state = null, action) {

  switch (action.type) {

    case DATA_FETCH_LATEST_PRODUCTS:
      return { latest: action.payload };

    case DATA_FETCH_PRODUCT:
      return { product: action.payload };

    case DATA_FETCH_BRAND:
      return { brand: action.payload };

    case DATA_FETCH_CATEGORY:
      return { category: action.payload };

    default:
      return state;
  }
}
