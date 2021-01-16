/* eslint-disable no-dupe-keys */
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  AD_REQUEST,
  AD_REQUEST_SUCCESS,
  AD_REQUEST_FAILURE,
  ADS_REQUEST,
  ADS_SUCCESS,
} from './types';
import {
  login, 
  loadAd,
  loadAds,
} from './actions';
import * as adsApi from '../api/adverts';

const createStore = extraArgument => {
  const middlewares = [thunk.withExtraArgument(extraArgument)];
  const mockStore = configureStore(middlewares);
  const store = mockStore();
  return store;
}

jest.mock('../api/adverts');
describe('--------------login action TESTS-----------------', () => {
  const credentials = 'logginInfo';
  const dispatch = jest.fn();
  const history = {
    push: jest.fn(),
  };
  const thunkAction = login(credentials);
  
  it('should log user and generate and AUTH_LOGIN_SUCCESS action if success', async () => {
    const loggedUserToken = 'JWT';
    const api = { auth: { login: jest.fn().mockResolvedValue(loggedUserToken) }}

    await thunkAction(dispatch, undefined, { history, api});

    expect(dispatch).toHaveBeenNthCalledWith( 1, { type: AUTH_LOGIN_REQUEST });
    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith( 2, { type: AUTH_LOGIN_SUCCESS, payload: loggedUserToken });
    expect(history.push).toHaveBeenCalledWith('/adverts');
  });

  it('should return an error and generate and AUTH_LOGIN_FAILURE action if failure', async () => {
    const error = 'error';
    const api = { auth: { login: jest.fn().mockRejectedValue(error) }}

    await thunkAction(dispatch, undefined, { history, api});

    expect(dispatch).toHaveBeenNthCalledWith( 1, { type: AUTH_LOGIN_REQUEST });
    expect(api.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith( 2, { type: AUTH_LOGIN_FAILURE, error: true, payload: 'error' } )
  });
});

describe('--------------loadAd action TESTS-----------------', () => {
  const id = '5434343df34qwe';
  const isNew = false;
  const dispatch = jest.fn();
  const history = jest.fn();
  const thunkAction = loadAd(id, isNew);

  it('should return the details of the advert id and generate and AD_REQUEST_SUCCESS action if success', async () => {
    const ad = {result: 'ad'};
    const api = { adverts: { getAdvert: jest.fn().mockResolvedValue(ad) }};

    await thunkAction(dispatch, undefined , { history, api});

    expect(dispatch).toHaveBeenNthCalledWith( 1, { type: AD_REQUEST });
    expect(api.adverts.getAdvert).toHaveBeenCalledWith(id);
    expect(dispatch).toHaveBeenNthCalledWith( 2, { type: AD_REQUEST_SUCCESS, payload: {ad: ad.result, isNew} });
  });

  it('should return an error and generate and AD_REQUEST_FAILURE action if error', async () => {
    const error = 'error';
    const api = { adverts: { getAdvert: jest.fn().mockRejectedValue(error) }};
    
    await thunkAction(dispatch, undefined , { history, api});

    expect(dispatch).toHaveBeenNthCalledWith( 1, { type: AD_REQUEST });
    expect(api.adverts.getAdvert).toHaveBeenCalledWith(id);
    expect(dispatch).toHaveBeenNthCalledWith( 2, { type: AD_REQUEST_FAILURE , payload: error} );
  });
});

describe('---------loadAds action TESTS (mocking module)---------', () => {
  test('should return the adverts and generate and ADS_SUCCESS action if success', async () => {
    const adsList = {result: { rows: 'ads' } };
    const history = jest.fn();
    const filters = {name: 'filters'};
    const thunkAction = loadAds(filters);
    const api = { adverts: { getAdverts: adsApi.getAdverts.mockResolvedValue(adsList) } };
    const store = createStore ({history, api});
    await thunkAction(store.dispatch);

     expect(store.getActions()).toEqual([
      { type: ADS_REQUEST },
      { type: ADS_SUCCESS, payload: adsList.result.rows },
    ]); 
    expect(adsApi.getAdverts).toHaveBeenCalledWith(filters)  
  });
});