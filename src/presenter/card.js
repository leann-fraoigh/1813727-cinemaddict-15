import CardView from '../view/card.js';

import {render, replace, remove} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';

export default class Card {
  constructor(list, changeData, openModal, linkModalToList) {
    this._cardContainer = list;
    this._changeData = changeData;
    this._cardComponent = null;
    this._modalComponent = null;
    this._openModal = openModal;
    this._linkModalToList = linkModalToList;

    this._handleMoreClick = this._handleMoreClick.bind(this);
    this._handleListClick = this._handleListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
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

    // if (this._modalComponent) {
    //   this._modalComponent.updateData(card);
    // }

    remove(prevCardComponent);
  }

  destroy() {
    remove(this._cardComponent);
  }

  _handleMoreClick() {
    this._openModal(this._card);
  }

  _handleCloseBtnClick() {
    this.closeModal();
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

}
