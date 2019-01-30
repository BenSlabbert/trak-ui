import { SEARCH } from "../actions/search/searchTypes";

export default function ( state = null, action ) {

  switch (action.type) {

    case SEARCH:
      return { search: action.payload };

    default:
      return state;
  }
}
