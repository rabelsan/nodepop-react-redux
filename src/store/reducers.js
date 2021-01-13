import * as types from './types';

const initialState = {
  auth: null,
  ads: {
    adverts: [],
    loading: false,
    error: null,
  },
  adDetails: {
    processing: false,
    errorChange: null,
    advert: null,
    isNew: false,
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

export const adDetails = (state = initialState.adDetails, action) => {
  switch (action.type) {
    case types.AD_REQUEST:
      return { ...state, processing: true, errChange: null, advert: null, isNew: false };
    case types.AD_REQUEST_SUCCESS:
      return { ...state, processing: false, errChange: null, advert: action.payload.ad, isNew: action.payload.isNew };
    case types.AD_REQUEST_FAILURE:
        return { ...state, processing: false, errChange: action.payload, advert:null, isNew: false };
    case types.AD_DELETE_REQUEST:
      return { ...state, processing: true, errChange: null, advert: action.payload, isNew: false };
    case types.AD_DELETE_SUCCESS:
      return { ...state, processing: false, errChange: null, advert: null, isNew: false };
    case types.AD_DELETE_FAILURE:
        return { ...state, processing: false, errChange: action.payload, advert:null, isNew: false };
    case types.AD_CREATE_REQUEST:
      return { ...state, processing: true, errChange: null, advert: null, isNew: false };
    case types.AD_CREATE_SUCCESS:
      return { ...state, processing: false, errChange: null, advert: action.payload, isNew: true };
    case types.AD_CREATE_FAILURE:
      return { ...state, processing: false, errChange: action.payload, advert: null, isNew: false }; 
    case types.AD_RESET_DETAILS:
      return { ...state, processing: false, errChange: null, advert: null, isNew: false };  
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