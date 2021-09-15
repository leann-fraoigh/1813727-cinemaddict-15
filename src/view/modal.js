import dayjs from 'dayjs';
import {formatRuntime, joinArray} from '../utils/common.js';
import {createCommentsTemplate} from './comment';
import Smart from './smart.js';

const createModalTemplate = (data) => {
  const {
    filmInfo: {
      title,
      alternativeTitle,
      totalRating,
      director,
      writers,
      actors,
      poster,
      ageRating,
      genres,
      description,
      runtime,
      release : {
        date,
        releaseCountry,
      },
    },
    userDetails: {
      watchlist,
      alreadyWatched,
      favorite,
    },
    comments,
    newCommentText = data.newComment ? data.newComment.newCommentText : null,
    newCommentEmoticon = data.newComment ? data.newComment.newCommentEmoticon : null,
  } = data;

  const formattedRuntime = formatRuntime(runtime);
  const releaseDate = dayjs(date).format('D MMMM YYYY');
  const listOfActors = joinArray(actors);
  const listOfWriters = joinArray(writers);
  const listOfGenres = genres.map((item) => `<span class="film-details__genre">${item}</span>`).join('');
  const getActiveBtnClassName = (isActive) => ( isActive ? 'film-details__control-button--active' : '');
  const listOfComments = createCommentsTemplate(comments);

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                ${alternativeTitle ? `<p class="film-details__title-original">Original: ${alternativeTitle}</p>` : ''}
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${listOfWriters}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${listOfActors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formattedRuntime}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">${genres.length < 2 ? 'Genre' : 'Genres'}</td>
                <td class="film-details__cell">${listOfGenres}</td>
              </tr>
            </table>

            <p class="film-details__film-description">${description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getActiveBtnClassName(watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${getActiveBtnClassName(alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${getActiveBtnClassName(favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
          ${listOfComments}
          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${newCommentEmoticon ? `<img src="images/emoji/${newCommentEmoticon}.png" width="55" height="55" alt="emoji-smile">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${newCommentText ? newCommentText : ''}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${newCommentEmoticon === 'smile' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${newCommentEmoticon === 'sleeping' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${newCommentEmoticon === 'puke' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${newCommentEmoticon === 'angry' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
              <button type="submit">Временная кнопка сабмита</button>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};


export default class Modal extends Smart {
  constructor(card) {
    super();
    this._data = Modal.parseCardToData(card);
    this._closeClickHandler = this._closeClickHandler.bind(this);
    this._listClickHandler = this._listClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._deleteCommentClickHandler = this._deleteCommentClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  _closeClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeClick();
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

  _deleteCommentClickHandler(evt) {
    if (evt.target.closest('.film-details__comment-delete')) {
      evt.preventDefault();
      this._callback.deleteCommentClick(evt.target.closest('.film-details__comment').dataset.commentId);
    }
  }

  getTemplate() {
    return createModalTemplate(this._data);
  }

  _getCloseButton() {
    if (!this._element) {
      return;
    }
    return this._element.querySelector('.film-details__close-btn');
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelectorAll('.film-details__emoji-list input')
      .forEach((radio) => {
        radio.addEventListener('click', this._emojiChangeHandler);
      });
    this.getElement()
      .querySelector('.film-details__comment-input')
      .addEventListener('input', this._commentInputHandler);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newComment: {
        ...this._data.newComment,
        newCommentEmoticon: evt.target.value,
      },
    });
  }

  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      newComment: {
        ...this._data.newComment,
        newCommentText: evt.target.value,
      },
    }, true);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setCloseBtnClickHandler(this._callback.closeClick);
    this.setListClickHandler(this._callback.listClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  setCloseBtnClickHandler(callback) {
    this._callback.closeClick = callback;
    this._element.querySelector('.film-details__close-btn').addEventListener('click', this._closeClickHandler);
  }

  setListClickHandler(callback) {
    this._callback.listClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._listClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._watchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.deleteCommentClick = callback;
    this.getElement().querySelector('.film-details__comments-list').addEventListener('click', this._deleteCommentClickHandler);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(Modal.processDataToCard(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  static parseCardToData(card) {
    return Object.assign(
      {},
      card,
    );
  }

  static processDataToCard(data) {
    if (data.newComment) {
      data.comments.push({
        id: '42', // Пока статика
        author: 'Jane Doe', // Тоже пока статика
        comment: data.newComment.newCommentText,
        date: Date.now(),
        emoticon: data.newComment.newCommentEmoticon,
      });
    }

    delete data.newComment;

    return data;
  }
}
