import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
} from './types';

import {
  authLoginRequest,
  authLoginSuccess,
} from './actions';

describe('--------------auth login actions TESTS-----------------', () => {
  
  it('should create an AUTH_LOGIN_REQUEST action', () => {
    const expectedAction = {
      type: AUTH_LOGIN_REQUEST,
    };
    expect(authLoginRequest()).toEqual(expectedAction);
  }); 

  const loggedUserToken = 'JWT';
  const expectedAction = {
    type: AUTH_LOGIN_SUCCESS,
    payload: loggedUserToken,
  };
  const action = authLoginSuccess(loggedUserToken);

  it('should create an AUTH_LOGIN_SUCCESS action', () => {
    expect(action).toEqual(expectedAction)
  });

  it('should create an AUTH_LOGIN_SUCCESS action which contains loggedUserToken obj', () => {
    expect(action).toMatchObject({payload: loggedUserToken});
  });

}); 