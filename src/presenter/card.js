import ModalView from '../view/modal';
import CardView from '../view/card.js';

import {ScrollState, setScrollLockState} from '../utils/common.js';
import {render, replace, remove} from '../utils/render';

export default class Card {
  constructor(cardContainer, changeData, changeModal) {
    this._cardContainer = cardContainer;
    this._changeData = changeData;
    this._cardComponent = null;
    this._modalComponent = null;
    this._changeModal = changeModal;

    this._handleMoreClick = this._handleMoreClick.bind(this);
    this._handleListClick = this._handleListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
  }

  init(card) {
    this._card = card;
    const prevCardComponent = this._cardComponent;
    this._cardComponent = new CardView(card);

    this._cardComponent.setMoreClickHandler(this._handleMoreClick);
    this._cardComponent.setListClickHandler(this._handleListClick);
    this._cardComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._cardComponent.setFavoriteClickHandler(this._handleFavoriteClick);

    if (prevCardComponent === null) {
      render(this._cardContainer, this._cardComponent);
      return;
    }

    if (this._cardContainer.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._modalComponent) {
      this._modalComponent.updateData(card);
    }

    remove(prevCardComponent);
  }

  closeModal() {
    if (this._modalComponent) {
      remove(this._modalComponent);
      setScrollLockState(ScrollState.off);
      this._modalComponent = null;
    }
  }

  _openModal() {
    this._changeModal();
    this._modalComponent = new ModalView(this._card);
    const body = document.querySelector('body');

    body.appendChild(this._modalComponent.getElement());
    setScrollLockState(ScrollState.on);

    this._modalComponent.setCloseBtnClickHandler(this._handleCloseBtnClick);
    this._modalComponent.setListClickHandler(this._handleListClick);
    this._modalComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._modalComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._modalComponent.setFormSubmitHandler(this._handleFormSubmit);
  }

  _handleMoreClick() {
    this._openModal();
  }

  _handleCloseBtnClick() {
    this.closeModal();
  }

  _handleListClick() {
    this._changeData(
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

  _handleFormSubmit(card) {
    this._changeData(card);
  }
}
