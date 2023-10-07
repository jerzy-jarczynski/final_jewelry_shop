import axios from "axios";
import { API_URL } from "../config";

// ACTIONS
const createActionName = name => `app/orders/${name}`;

export const LOAD_ORDERS = createActionName("LOAD_ORDERS");
export const DELETE_ORDER = createActionName("DELETE_ORDER");
export const UPDATE_ORDER = createActionName("UPDATE_ORDER");
export const LOAD_SINGLE_ORDER = createActionName("LOAD_SINGLE_ORDER");
export const START_LOADING = createActionName("START_LOADING");
export const END_LOADING = createActionName("END_LOADING");
export const ERROR_ORDER = createActionName("ERROR");

export const loadOrders = payload => ({ type: LOAD_ORDERS, payload });
export const deleteOrder = orderId => ({ type: DELETE_ORDER, payload: orderId });
export const updateOrder = (orderId, updatedData) => ({ type: UPDATE_ORDER, payload: { orderId, updatedData } });
export const loadSingleOrder = payload => ({ type: LOAD_SINGLE_ORDER, payload });
export const setErrorOrder = payload => ({ type: ERROR_ORDER, payload });

// THUNKS
export const loadOrdersRequest = () => async dispatch => {
  try {
    const res = await axios.get(`${API_URL}/orders`);
    dispatch(loadOrders(res.data));
  } catch (e) {
    dispatch(setErrorOrder(e.message));
  }
};

export const deleteOrderRequest = orderId => async dispatch => {
  try {
    await axios.delete(`${API_URL}/orders/${orderId}`);
    dispatch(deleteOrder(orderId));
  } catch (e) {
    dispatch(setErrorOrder(e.message));
  }
};

export const updateOrderRequest = (orderId, updatedData) => async dispatch => {
  try {
    await axios.put(`${API_URL}/orders/${orderId}`, updatedData);
    dispatch(updateOrder(orderId, updatedData));
  } catch (e) {
    dispatch(setErrorOrder(e.message));
  }
};

export const loadOrderByIdRequest = orderId => async dispatch => {
  dispatch({ type: START_LOADING });
  try {
    const res = await axios.get(`${API_URL}/orders/${orderId}`);
    dispatch(loadSingleOrder(res.data));
  } catch (e) {
    dispatch(setErrorOrder(e.message));
  } finally {
    dispatch({ type: END_LOADING });
  }
};

// SELECTORS
export const getOrders = ({ orders }) => {
  return orders.data;
};

export const getOrdersError = ({ orders }) => {
  return orders.error;
};

export const getOrderById = (state, orderId) => {
  if (!state.orders || !state.orders.data) return null;
  return state.orders.data.find(order => order.id === orderId);
};

// REDUCER
const initialState = {
  data: [],
  loading: false,
  error: null
};

const ordersReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case LOAD_ORDERS:
      return { ...statePart, data: action.payload };
    case DELETE_ORDER:
      return {
        ...statePart,
        data: statePart.data.filter(order => order.id !== action.payload)
      };
    case UPDATE_ORDER: {
      const updatedOrders = statePart.data.map(order => {
        if (order.id === action.payload.orderId) {
          return {
            ...order,
            ...action.payload.updatedData
          };
        }
        return order;
      });
      return {
        ...statePart,
        data: updatedOrders
      };
    }
    case LOAD_SINGLE_ORDER: {
      const updatedData = statePart.data ? [...statePart.data] : [];
      const orderIndex = updatedData.findIndex(order => order.id === action.payload.id);
      if (orderIndex !== -1) {
        updatedData[orderIndex] = action.payload;
      } else {
        updatedData.push(action.payload);
      }
      return { ...statePart, data: updatedData };
    }
    case START_LOADING:
      return { ...statePart, loading: true };
    case END_LOADING:
      return { ...statePart, loading: false };
    case ERROR_ORDER:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default ordersReducer;