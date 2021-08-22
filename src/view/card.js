import dayjs from 'dayjs';
import {formatRuntime, createElement} from '../utils.js';

const createCardTemplate = (card) => {
  const {
    filmInfo: {
      title,
      totalRating,
      poster,
      genres: [mainGenre],
      description,
      runtime,
      release : {date},
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
    comments,
  } = card;

  const descriptionPreview = description.length < 140 ? description : `${description.substring(0, 139)}...`;

  const releaseDate = dayjs(date).format('YYYY');

  const activeBtnClassName = (isActive) => (
    isActive ? 'film-card__controls-item--active' : '');

  const formattedRuntime = formatRuntime(runtime);

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${formattedRuntime}</span>
      <span class="film-card__genre">${mainGenre}</span>
    </p>
    <img src="./images/posters/${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${descriptionPreview}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${activeBtnClassName(watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${activeBtnClassName(alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${activeBtnClassName(favorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class Card {
  constructor(card) {
    this._element = null;
    this._card = card;
  }

  getTemplate() {
    return createCardTemplate(this._card);
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
