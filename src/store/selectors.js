export const getLoggedUserToken = state => state.auth;

export const getUi = state => state.ui;

export const getAds = state => state.ads;

export const getTags = state => {
    let { tags } = state;
    if (!tags.list) {
      return null;
    }
  
    return tags.list;
}
