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
  
export const authLoginSuccess = loggedUserId => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: loggedUserId,
});

export const login = crendentials => {
    console.log('login');
    return async function (dispatch, getState, { history, api }) {
      console.log('executing thunk');
      dispatch(authLoginRequest());
      try {
        const loggedUserId = await api.auth.login(crendentials);
        dispatch(authLoginSuccess(loggedUserId));
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
   