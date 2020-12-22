import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
} from './types';

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});
  
export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});
  
export const authLoginSuccess = loggedUserToken => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: loggedUserToken,
});

export const login = credentials => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(authLoginRequest());
      try {
        const loggedUserToken =  await api.auth.login(credentials);
        dispatch(authLoginSuccess(loggedUserToken));
        history.push('/adverts');
      } catch (error) {
        dispatch(authLoginFailure(error));
      }
    };
  };
  
  export const authLogout = () => {
    return {
      type: AUTH_LOGOUT,
    };
  };
   