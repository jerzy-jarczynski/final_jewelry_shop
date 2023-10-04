import axios from "axios";
import { API_URL } from "../config";

// ACTIONS
const createActionName = (name) => `app/cart/${name}`;

export const LOAD_CART = createActionName("LOAD_CART");
export const ERROR = createActionName("ERROR");

export const loadCart = (payload) => ({ type: LOAD_CART, payload });
export const setError = (payload) => ({ type: ERROR, payload });

// THUNKS
export const loadCartProductsRequest = () => async (dispatch) => {
  console.log('loadCartProductsRequest dispatched');
  try {
    const res = await axios.get(`${API_URL}/cart`);
    console.log('API response:', res.data);
    dispatch(loadCart(res.data));
  } catch (e) {
    console.log('API error:', e.message);
    dispatch(setError(e.message));
  }
};

// SELECTORS
export const getCartProducts = ({ cart }) => {
  console.log('Cart data from state:', cart.data);
  return cart.data;
};
export const getCartError = ({ cart }) => {
  console.log('Cart error from state:', cart.error);
  return cart.error;
};

// REDUCER
const cartReducer = (statePart = [], action) => {
  console.log('Action dispatched:', action.type, action.payload);
  switch (action.type) {
    case LOAD_CART:
      return { ...statePart, data: action.payload };
    case ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default cartReducer;