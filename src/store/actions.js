import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  AUTH_ADS_REQUEST,
  AUTH_ADS_SUCCESS,
  AUTH_ADS_FAILURE,
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

  export const adsRequest = () => ({
    type: AUTH_ADS_REQUEST,
  });

  export const adsFailure = error => ({
    type: AUTH_ADS_FAILURE,
    payload: error,
  });

  export const adsSuccess = adsList => ({
    type: AUTH_ADS_SUCCESS,
    payload: adsList,
  });

  export const loadAds = filters => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adsRequest());
      try {
        const ads =  await api.adverts.getAdverts(filters);
        dispatch(adsSuccess(ads.result.rows));
      } catch (error) {
        dispatch(adsFailure(error));
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

  export const loadTags = () => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(tagsRequest());
      try {
        const tags =  await api.adverts.getTags();
        dispatch(tagsSuccess(tags.result));
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
   