import { AD_CREATE_SUCCESS, TAGS_SUCCESS } from './types';

import { adDetails, tags } from './reducers';

describe('adDetails', () => {
  test('should handle a AD_CREATE_SUCCESS action', () => {
    const state = { processing: false, errChange: null,  advert: null, isNew: false };
    const action = {
      type: AD_CREATE_SUCCESS,
      payload: 'advert',
    };
    const expectedState = { processing: false, errChange: null,  advert: 'advert', isNew: true };
    expect(adDetails(state, action)).toEqual(expectedState);
  });

  test('should handle a TAGS_SUCCESS action', () => {
    const state = { list: [], error: null };
    const action = {
      type: TAGS_SUCCESS,
      payload: ['work', 'lifestyle', 'mobile', 'motor'],
    };
    const expectedState = { list: ['work', 'lifestyle', 'mobile', 'motor'], error: null };
    expect(tags(state, action)).toEqual(expectedState);
  });

  test('should handle ANY action', () => {
    const state = [];
    const action = {
      type: 'ANY',
    };
    expect(adDetails(state, action)).toEqual(state);
  });
});
