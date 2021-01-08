import * as types from './types';

const initialState = {
  auth: null,
  ads: {
    adverts: [],
    loading: false,
    error: null,
  },
  adStatus: {
    processing: false,
    errorChange: null,
    result: null,
  },
  tags: {
    list: [],
    error: null,
  },
  ui: {
    loading: false,
    error: null,
  },
};

export const auth = (state = initialState.auth, action) => {
  switch (action.type) {
    case types.AUTH_LOGIN_SUCCESS:
      // login
      return action.payload;
    case types.AUTH_LOGOUT:
      // logout
      return null;
    default:
      return state;
  }
};

export const ads = (state = initialState.ads, action) => {
  switch (action.type) {
    case types.ADS_REQUEST:
      return { ...state, adverts: [], loading:true, error: null };
    case types.ADS_SUCCESS:
      return { ...state, adverts: action.payload, loading: false, error: null };
    case types.ADS_FAILURE:
      return { ...state, adverts: [], loading: false, error: action.payload };
    default:
      return state;
  }
};

export const adStatus = (state = initialState.adStatus, action) => {
  switch (action.type) {
    case types.AD_DELETE:
      return { ...state, processing: true, errChange: null, result: null };
    case types.AD_DELETE_SUCCESS:
      return { ...state, processing: false, errChange: null, result: action.payload };
    case types.AD_DELETE_FAILURE:
        return { ...state, processing: false, errChange: action.payload, result:null };
    case types.AD_CREATE:
      return { ...state, processing: true, errChange: false, result: null };
    case types.AD_CREATE_SUCCESS:
      return { ...state, processing: false, errChange: false, result: action.payload };
    case types.AD_CREATE_FAILURE:
      return { ...state, processing: false, errChange: action.payload, result: null };  
    default:
      return state;
  }
};

export const tags = (state = initialState.tags, action) => {
  switch (action.type) {
    case types.TAGS_REQUEST:
      return { ...state, list: [], error: null };
    case types.TAGS_SUCCESS:
      return { ...state, list: action.payload, error: null };
    case types.TAGS_FAILURE:
      return { ...state, list: [], error: action.payload };
    default:
      return state;
  }
};

export const ui = (state = initialState.ui, action) => {
    if (action.error) {
      return { ...state, error: action.payload, loading: false };
    }
    switch (action.type) {
      case types.AUTH_LOGIN_REQUEST:
        return { ...state, error: null, loading: true };
      case types.AUTH_LOGIN_SUCCESS:
        return { ...state, error: null, loading: false };
      default:
        return state;
    }
  };