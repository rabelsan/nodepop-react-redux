export const getLoggedUserToken = state => state.auth;

export const getUi = state => state.ui;

export const getAds = state => state.ads;

export const getAdDetails = state => state.adDetails; 

export const getAdvertById = id => state => {
  let result = getAds(state);
  if (!result) {
    return null;
  }
  return result.adverts.find(ad => ad._id === id); 
};

export const getTags = state => state.tags;
