import { AD_CREATE_SUCCESS } from './types';

import { adDetails } from './reducers';

describe('adDetails', () => {
  test('should handle a AD_CREATE_SUCCESS action', () => {
    const state = [
      { id: '1', likes: [] },
      { id: '2', likes: [] },
    ];
    const action = {
      type: AD_CREATE_SUCCESS,
      payload: {
        tweetId: '1',
        like: 'like',
      },
    };
    const expectedState = [
      { id: '1', likes: ['like'] },
      { id: '2', likes: [] },
    ];
    expect(tweets(state, action)).toEqual(expectedState);
  });

  test('should handle ANY action', () => {
    const state = [];
    const action = {
      type: 'ANY',
    };
    expect(tweets(state, action)).toEqual(state);
  });
});
