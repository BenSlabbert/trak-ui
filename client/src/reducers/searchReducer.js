import { SEARCH_BRANDS, SEARCH_CATEGORIES, SEARCH_LOADING, SEARCH_PRODUCTS } from "../actions/search/searchTypes";

export default function (state = null, action) {

  switch (action.type) {

    case SEARCH_PRODUCTS:

      if (state && state.searchProducts) {
        state.searchProducts = action.payload;
      }

      return { searchProducts: action.payload, ...state, isLoading: false };

    case SEARCH_BRANDS:

      if (state && state.searchBrands) {
        state.searchBrands = action.payload;
      }

      return { searchBrands: action.payload, ...state, isLoading: false };

    case SEARCH_CATEGORIES:

      if (state && state.searchCategories) {
        state.searchCategories = action.payload;
      }

      return { searchCategories: action.payload, ...state, isLoading: false };

    case SEARCH_LOADING:
      return { isLoading: action.payload };

    default:
      return state;
  }
}
