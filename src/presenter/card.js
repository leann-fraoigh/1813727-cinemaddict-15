import ModalView from '../view/modal';
import CardView from '../view/card.js';

import {ScrollState, setScrollLockState} from '../utils/common.js';
import {render} from '../utils/render';

export default class Card {
  constructor(cardContainer, toggleModal) {
    this._cardContainer = cardContainer;
    this._toggleModal = toggleModal;

    this._handleMoreClick = this._handleMoreClick.bind(this);
  }

  init(card) {
    this._card = card;

    this._cardComponent = new CardView(card);
    render(this._cardContainer, this._cardComponent);
    this._cardComponent.setMoreClickHandler(this._handleMoreClick);
  }

  _openModal() {
    const modalComponent = new ModalView(this._card);
    const body = document.querySelector('body');

    body.appendChild(modalComponent.getElement());
    setScrollLockState(ScrollState.on);

    const onCloseBtnClick = () => {
      body.removeChild(modalComponent.getElement());
      setScrollLockState(ScrollState.off);
    };

    modalComponent.setCloseBtnClickHandler(onCloseBtnClick);
  }

  _handleMoreClick() {
    this._openModal();
  }
}
