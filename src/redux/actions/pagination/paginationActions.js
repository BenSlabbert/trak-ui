import { PAGE_ALL_DEALS, PAGE_DAILY_DEALS } from "./paginationTypes";

export const pageAllDeals = (page = 1) => ({ type: PAGE_ALL_DEALS, payload: page });

export const pageDailyDeals = (page = 1) => ({ type: PAGE_DAILY_DEALS, payload: page });
