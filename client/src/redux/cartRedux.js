import axios from "axios";
import { API_URL } from "../config";

// ACTIONS
const createActionName = (name) => `app/cart/${name}`;

export const LOAD_CART = createActionName("LOAD_CART");
export const DELETE_CART_ITEM = createActionName("DELETE_CART_ITEM");
export const ERROR = createActionName("ERROR");

export const loadCart = (payload) => ({ type: LOAD_CART, payload });
export const deleteCartItem = (itemId) => ({ type: DELETE_CART_ITEM, payload: itemId });
export const setError = (payload) => ({ type: ERROR, payload });

// THUNKS
export const loadCartProductsRequest = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API_URL}/cart`);
    dispatch(loadCart(res.data));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

export const deleteCartItemRequest = (itemId) => async (dispatch) => {
  try {
    await axios.delete(`${API_URL}/cart/${itemId}`);
    dispatch(deleteCartItem(itemId));
  } catch (e) {
    dispatch(setError(e.message));
  }
};

// SELECTORS
export const getCartProducts = ({ cart }) => {
  return cart.data;
};
export const getCartError = ({ cart }) => {
  return cart.error;
};

// REDUCER
const cartReducer = (statePart = [], action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...statePart, data: action.payload };
    case DELETE_CART_ITEM:
      return {
        ...statePart,
        data: statePart.data.filter(item => item.id !== action.payload)
      };
    case ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default cartReducer;