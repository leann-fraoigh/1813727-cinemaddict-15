import dayjs from 'dayjs';
import {formatRuntime} from '../utils/common.js';
import AbstractView from './abstract.js';


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

export default class Card extends AbstractView {
  constructor(card) {
    super();
    this._card = card;
    this._moreClickHandler = this._moreClickHandler.bind(this);
    this._listClickHandler = this._listClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  _moreClickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  _listClickHandler(evt) {
    evt.preventDefault();
    this._callback.listClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _getClickableElements() {
    if (!this.getElement()) {
      return;
    }
    return this.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');
  }

  getTemplate() {
    return createCardTemplate(this._card);
  }

  setMoreClickHandler(callback) {
    this._callback.click = callback;
    this._getClickableElements().forEach((item) => {
      item.addEventListener('click', this._moreClickHandler);
    });
  }

  setListClickHandler(callback) {
    this._callback.listClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._listClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }
}
