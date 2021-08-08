const cardToFilterMap = {
  allMovies: (cards) => cards,
  watchlist: (cards) => cards.filter((card) => card.userDetails.watchlist),
  history: (cards) => cards.filter((card) => card.userDetails.alreadyWatched),
  favorites: (cards) => cards.filter((card) => card.userDetails.favorite),
};

export const generateFilters = (cards) => Object.entries(cardToFilterMap).map(
  ([filterName, countCards]) => ({
    name: filterName,
    count: countCards(cards),
  }),
);
