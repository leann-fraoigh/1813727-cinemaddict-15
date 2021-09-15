import ModalView from '../view/modal';

import {ScrollState, setScrollLockState} from '../utils/common.js';
import {remove} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';

export default class Modal {
  constructor(card, changeData, closeModal) {
    this._card = card;
    this._modalContainer = document.querySelector('body');
    this._changeData = changeData;
    this._modalComponent = null;
    this._closeModal = closeModal;

    this._handleListClick = this._handleListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init() {
    this._modalComponent = new ModalView(this._card);

    this._modalContainer.appendChild(this._modalComponent.getElement());
    setScrollLockState(ScrollState.on);

    this._modalComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);
    this._modalComponent.setListClickHandler(this._handleListClick);
    this._modalComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._modalComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._modalComponent.setDeleteCommentClickHandler(this._handleDeleteCommentClick);
    this._modalComponent.setFormSubmitHandler(this._handleFormSubmit);
  }

  destroy() {
    remove(this._modalComponent);
    setScrollLockState(ScrollState.off);
    this._modalComponent = null;
  }

  _handleCloseBtnClick() {
    this._closeModal();
  }

  _handleListClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MAJOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            watchlist: !this._card.userDetails.watchlist,
          },
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MAJOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            alreadyWatched: !this._card.userDetails.alreadyWatched,
          },
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MAJOR,
      Object.assign(
        {},
        this._card,
        {
          userDetails: {
            ...this._card.userDetails,
            favorite: !this._card.userDetails.favorite,
          },
        },
      ),
    );
  }

  _handleDeleteCommentClick(id) {
    const updatedComments = this._card.comments.filter((comment) => comment.id !== parseInt(id, 10));
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MAJOR,
      Object.assign(
        {},
        this._card,
        {
          comments: updatedComments,
        },
      ),
    );
  }

  _handleFormSubmit(card) {
    this._changeData(
      UserAction.UPDATE_CARD,
      UpdateType.MAJOR,
      card);
  }
}
