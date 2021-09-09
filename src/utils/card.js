const sortByRating = (a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating;

const sortByDate = (a, b) => b.filmInfo.release.date - a.filmInfo.release.date;

const sortByComments = (a, b) => b.comments.length - a.comments.length;

export {sortByRating, sortByDate, sortByComments};
