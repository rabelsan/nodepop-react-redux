import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_TAGS_REQUEST,
  AUTH_TAGS_SUCCESS,
  AUTH_TAGS_FAILURE,
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

  export const tagsRequest = () => ({
    type: AUTH_TAGS_REQUEST,
  });

  export const tagsFailure = error => ({
    type: AUTH_TAGS_FAILURE,
    payload: error,
  });

  export const tagsSuccess = tagsList => ({
    type: AUTH_TAGS_SUCCESS,
    payload: tagsList,
  });

  export const tags = () => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(tagsRequest());
      try {
        const tagsList =  await api.adverts.getTags();
        dispatch(authLoginSuccess(tagsList));
      } catch (error) {
        dispatch(tagsFailure(error));
      }
    };
  };
    
  export const authLogout = () => {
    return {
      type: AUTH_LOGOUT,
    };
  };
   