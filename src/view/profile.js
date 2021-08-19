
import {createElement} from '../utils.js';

const getRatingStatus = (watchedFilms) => {
  const Level = {
    0: '',
    1: 'Novice',
    2: 'Fan',
    3: 'Movie buff',
  };

  if (watchedFilms === 0) {
    return Level[0];
  } else if (watchedFilms < 11) {
    return Level[1];
  } else if (watchedFilms < 21) {
    return Level[2];
  } else {
    return Level[3];
  }
};

const createProfileTemplate = (cards) => {
  const watchedMovies = cards.filter((card) => card.userDetails.alreadyWatched).length;
  const status = getRatingStatus(watchedMovies);

  return `<section class="header__profile profile">
      ${status ? `<p class="profile__rating">${status}</p>` : ''}
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`;
};

export default class Profile {
  constructor(cards) {
    this._cards = cards;
    this._element = null;
  }

  getTemplate() {
    return createProfileTemplate(this._cards);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
