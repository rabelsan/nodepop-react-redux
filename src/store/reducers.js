import * as types from './types';

const initialState = {
  auth: null,
  ui: {
    loading: false,
    error: null,
  },
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      // login
      return action.payload;
    case types.AUTH_LOGOUT:
      // logout
      return null;
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
    if (action.error) {
      return { ...state, error: action.payload, loading: false };
    }
    switch (action.type) {
      case types.AUTH_LOGIN_REQUEST:
        return { ...state, error: null, loading: true };
      case types.AUTH_LOGIN_SUCCESS:
        return { ...state, error: null, loading: false };
      default:
        return state;
    }
  };