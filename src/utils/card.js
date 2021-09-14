const sortByRating = (a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating;

const sortByDate = (a, b) => b.filmInfo.release.date - a.filmInfo.release.date;

const sortByComments = (a, b) => b.comments.length - a.comments.length;

// const isCardInWatchlist = (dueDate) =>
//   dueDate === null ? false : dayjs().isAfter(dueDate, 'D');

export {sortByRating, sortByDate, sortByComments};
