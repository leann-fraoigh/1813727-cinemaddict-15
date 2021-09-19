const AGE_RATINGS = [0, 6, 12, 16, 18];
const GENRES = ['Comedy', 'Sci-Fi', 'Horror', 'Romance', 'Action', 'Thriller', 'Drama', 'Mystery', 'Crime', 'Animation', 'Adventure', 'Fantasy', 'Comedy-Romance'];
const EMOTICONS = ['smile', 'sleeping', 'puke', 'angry'];
const SortType = {
  DEFAULT: 'default',
  RATING: 'rating',
  DATE: 'date',
  COMMENTS: 'comments',
};
const UserAction = {
  UPDATE_CARD: 'UPDATE_CARD',
  // ADD_COMMENT: 'ADD_COMMENT',
  // DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  // PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export {AGE_RATINGS, GENRES, EMOTICONS, SortType, UserAction, UpdateType, FilterType};
