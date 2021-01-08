import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADS_REQUEST,
  ADS_SUCCESS,
  ADS_FAILURE,
  ADS_DELETE,
  ADS_DELETE_SUCCESS,
  ADS_DELETE_FAILURE,
  ADS_CREATE,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
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
    type: ADS_REQUEST,
  });

  export const adsFailure = error => ({
    type: ADS_FAILURE,
    payload: error,
  });

  export const adsSuccess = adsList => ({
    type: ADS_SUCCESS,
    payload: adsList,
  });

  export const adsDelete = adsList => ({
    type: ADS_DELETE,
  });

  export const adDeleteSuccess = () => ({
    type: ADS_DELETE_SUCCESS,
  });

  export const adDeleteFailure = error => ({
    type: ADS_DELETE_FAILURE,
    payload: error,
  });

  export const loadAds = filters => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adsRequest());
      try {
        const ads =  await api.adverts.getAdverts(filters);
        dispatch(adsSuccess(ads.result.rows));
      } catch (error) {
        dispatch(adDeleteFailure(error));
      }
    };
  };

  export const deleteAd = id => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adsDelete());
      try {
        const result = await api.adverts.deleteAdvert(id);
        dispatch(adDeleteSuccess());
      } catch (error) {
        dispatch(adDeleteFailure(error));
      }
    };
  };

  export const tagsRequest = () => ({
    type: TAGS_REQUEST,
  });

  export const tagsFailure = error => ({
    type: TAGS_FAILURE,
    payload: error,
  });

  export const tagsSuccess = tagsList => ({
    type: TAGS_SUCCESS,
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
   