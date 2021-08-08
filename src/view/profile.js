export const createProfileTemplate = (cards) => {
  const Level = {
    0: '',
    1: 'Novice',
    2: 'Fan',
    3: 'Movie buff',
  };

  const watchedMovies = cards.filter((card) => card.userDetails.alreadyWatched).length;

  let status;

  if (watchedMovies === 0) {
    status = Level[0];
  } else if (watchedMovies < 11) {
    status = Level[1];
  } else if (watchedMovies < 21) {
    status = Level[2];
  } else {
    status = Level[3];
  }

  return `<section class="header__profile profile">
      ${status ? `<p class="profile__rating">${status}</p>` : ''}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};
