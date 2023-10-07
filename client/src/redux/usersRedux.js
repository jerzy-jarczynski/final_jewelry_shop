import axios from "axios";
import { API_AUTH_URL } from "../config";

// SELECTORS
export const getUser = ({ user }) => user ? user.data : null;
export const isUserLoading = ({ user }) => user.data === null && user.error === null;
export const getUserError = ({ user }) => user.error;

// ACTION TYPES
const reducerName = "users";
const createActionName = (name) => `app/${reducerName}/${name}`;

const LOG_IN = createActionName("LOG_IN");
const LOG_OUT = createActionName("LOG_OUT");
const SET_ERROR = createActionName("SET_ERROR");
const START_LOADING = createActionName("START_LOADING");
const END_LOADING = createActionName("END_LOADING");

// ACTION CREATORS
export const logIn = (user) => ({ type: LOG_IN, payload: user });
export const logOut = () => ({ type: LOG_OUT });
export const setError = (payload) => ({ type: SET_ERROR, payload });
export const startLoading = () => ({ type: START_LOADING });
export const endLoading = () => ({ type: END_LOADING });

// THUNKS
export const loadLoggedUser = () => {
  return async (dispatch) => {
    dispatch(startLoading());
    try {
      let res = await axios.get(`${API_AUTH_URL}/user`, {
        withCredentials: true,
      });
      dispatch(logIn({ login: res.data.email }));
    } catch (e) {
      dispatch(setError(e.message));
    } finally {
      dispatch(endLoading());
    }
  };
};

const initialState = {
  data: null,
  loading: false,
  error: null
};

// REDUCER
const usersReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case START_LOADING:
      return { ...statePart, loading: true };
    case END_LOADING:
      return { ...statePart, loading: false };
    case LOG_IN:
      return { ...statePart, data: action.payload, error: null };
    case LOG_OUT:
      return { ...statePart, data: null, error: null };
    case SET_ERROR:
      return { ...statePart, error: action.payload };
    default:
      return statePart;
  }
};

export default usersReducer;