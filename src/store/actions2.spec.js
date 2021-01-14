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

import {
  login, 
  authLoginRequest, 
  authLoginSuccess, 
  authLoginFailure,
  loadAd,
  adRequest,
  adRequestSuccess,
  adRequestFailure,
} from './actions';

describe('--------------async actions TESTS-----------------', () => {
  it('should log user and generate and AUTH_LOGIN_SUCCESS action', () => {

  });
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

