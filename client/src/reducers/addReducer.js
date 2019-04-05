import { ADD_LOADING, ADD_PRODUCTS } from "../actions/add/addTypes";

export default function(state = null, action) {
    switch (action.type) {
        case ADD_PRODUCTS: 
            if (state && state.addProducts) {
                state.addProducts = action.payload
            }

        case ADD_LOADING:
            return { isLoading: action.payload };

        default:
            return state;
    }
}