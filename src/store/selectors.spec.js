import { getLoggedUserToken } from './selectors';

describe('getLogggedUserToken', () => {
  test('should return null', () => {
    const state = {
      auth: null,
    };
    expect(getLoggedUserToken(state)).toBe(null);
  });

  test('should return a JWT token', () => {
    const state = {
      auth: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM3ZTQ4ZmU5YWE2ZjI0YzE0MDM4ZDQiLCJpYXQiOjE2MTA4MzM4NDcsImV4cCI6MTYxMTAwNjY0N30.e_BVuWSxvHetGQsH08NCKqYf7T2lYcVXO7JgwLGLYF0"
      },
    };
    expect(getLoggedUserToken(state)).toStrictEqual({
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmM3ZTQ4ZmU5YWE2ZjI0YzE0MDM4ZDQiLCJpYXQiOjE2MTA4MzM4NDcsImV4cCI6MTYxMTAwNjY0N30.e_BVuWSxvHetGQsH08NCKqYf7T2lYcVXO7JgwLGLYF0"
      },
    );
  });
});
