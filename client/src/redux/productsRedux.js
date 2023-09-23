import axios from "axios";
import { API_URL } from "../config";

// ACTIONS
const createActionName = (name) => `app/products/${name}`;

export const LOAD_PRODUCTS = createActionName("LOAD_ADS");
export const ERROR = createActionName("ERROR");

export const loadProducts = (payload) => ({ type: LOAD_PRODUCTS, payload });
export const setError = (payload) => ({ type: ERROR, payload });

// THUNKS
export const loadProductsRequest = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/products`);
    dispatch(loadProducts(res.data));
  } catch (e) {
    dispatch(setError(e.message));
  }
}

// SELECTORS
export const getProducts = ({ products }) => products.data;
export const getProductsError = ({ products }) => products.error;

// REDUCER
const adsReducer = (statePart = [], action) => {
  switch (action.type) {
        case LOAD_PRODUCTS:
            return { ...statePart, data: action.payload };
        case ERROR:
            return { ...statePart, error: action.payload };
        default:
            return statePart;
    }
};

export default adsReducer;
