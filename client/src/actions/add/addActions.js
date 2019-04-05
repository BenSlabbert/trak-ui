import axios from 'axios';
import { apiActionExceptionHandler } from '../../util/apiActionExceptionHandler';
import { clearAllErrors } from '..';
import { ADD_PRODUCTS, ADD_LOADING } from "./addTypes";
import { DATA_LOADING } from "../data/dataTypes";

export const addLoadingStop = () => {
    return { type: ADD_LOADING, payload: false };
};

export const addProduct = (add = null) => async dispatch => {
    dispatch(clearAllErrors());

    if (!add) {
        return;
    }

    dispatch({ type: ADD_LOADING, payload: true });

    try {
        const res = await axios.post(`/api/add/`);
        dispatch({ type: ADD_PRODUCTS, payload: res.data });
        
        
    } catch (e) {
        
    }
}



