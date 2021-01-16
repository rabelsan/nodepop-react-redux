import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADS_REQUEST,
  ADS_SUCCESS,
  ADS_FAILURE,
  AD_REQUEST,
  AD_REQUEST_SUCCESS,
  AD_REQUEST_FAILURE,
  AD_DELETE_REQUEST,
  AD_DELETE_SUCCESS,
  AD_DELETE_FAILURE,
  AD_CREATE_REQUEST,
  AD_CREATE_SUCCESS,
  AD_CREATE_FAILURE,
  AD_RESET_DETAILS,
  TAGS_REQUEST,
  TAGS_SUCCESS,
  TAGS_FAILURE,
} from './types';

import * as adsApi from '../api/adverts';

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

  export const adRequest = () => ({
    type: AD_REQUEST,
  });

  export const adRequestFailure = error => ({
    type: AD_REQUEST_FAILURE,
    payload: error,
  });

  export const adRequestSuccess = (ad, isNew) => ({
    type: AD_REQUEST_SUCCESS,
    payload: { ad, isNew }
  });

  export const adCreateRequest = adsList => ({
    type: AD_CREATE_REQUEST,
  });

  export const adCreateSuccess = (result) => ({
    type: AD_CREATE_SUCCESS,
    payload: result,
  });

  export const adCreateFailure = error => ({
    type: AD_CREATE_FAILURE,
    payload: error,
  });

  export const adDeleteRequest = adsList => ({
    type: AD_DELETE_REQUEST,
  });

  export const adDeleteSuccess = (result) => ({
    type: AD_DELETE_SUCCESS,
    payload: result,
  });

  export const adDeleteFailure = error => ({
    type: AD_DELETE_FAILURE,
    payload: error,
  });

  export const adResetDetails = () => ({
    type: AD_RESET_DETAILS,
  });

  export const createAd = id => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adCreateRequest());
      try {
        const ad = await api.adverts.createAdvert(id);
        dispatch(adCreateSuccess(ad.result));
      } catch (error) {
        dispatch(adCreateFailure(error));
      }
    };
  };

  export const deleteAd = id => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adDeleteRequest());
      try {
        const result = await api.adverts.deleteAdvert(id);
        dispatch(adDeleteSuccess(result));
      } catch (error) {
        dispatch(adDeleteFailure(error));
      }
    };
  };

  export const loadAd = (id, isNew = false) => {
    return async function (dispatch, getState, { history, api }) {
      dispatch(adRequest());
      try {
        const ad =  await api.adverts.getAdvert(id);
        dispatch(adRequestSuccess(ad.result, isNew));
      } catch (error) {
        dispatch(adRequestFailure(error));
      }
    };
  };

  export const loadAds = filters => {
    return async function (dispatch, getState) {
      dispatch(adsRequest());
      try {
        const ads =  await adsApi.getAdverts(filters);
        dispatch(adsSuccess(ads.result.rows));
      } catch (error) {
        dispatch(adsFailure(error));
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
   