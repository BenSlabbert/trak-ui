import { PAGE_ALL_DEALS, PAGE_DAILY_DEALS } from "../actions/pagination/paginationTypes";

export default function (state = null, action) {
  switch (action.type) {
    case PAGE_ALL_DEALS:
      return { ...state, pageAllDeals: action.payload };

    case PAGE_DAILY_DEALS:
      return { ...state, pageDailyDeals: action.payload };

    default:
      return state;
  }
}
