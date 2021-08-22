import AbstractView from './abstract.js';
import ModalView from './modal';
import CardView from './card.js';
import {ScrollState, setScrollLockState, getValue} from '../utils/common.js';
import {render} from '../utils/render';

const createListTemplate = (list) => (
  `<section class="films-list ${list.mod ? list.mod : ''}">
    <h2 class="films-list__title ${list.headerIsHidden ? 'visually-hidden' : ''}">${list.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class List extends AbstractView {
  constructor(list) {
    super();
    this._element = null;
    this._list = list;
  }

  _getContainer() {
    return this._element.querySelector('.films-list__container');
  }

  getContainer() {
    return this._element.querySelector('.films-list__container');
  }

  _renderModal(card) {
    const modalComponent = new ModalView(card);
    const body = document.querySelector('body');

    body.appendChild(modalComponent.getElement());
    setScrollLockState(ScrollState.on);

    const onCloseBtnClick = () => {
      body.removeChild(modalComponent.getElement());
      setScrollLockState(ScrollState.off);
    };

    modalComponent.setCloseBtnClickHandler(onCloseBtnClick);
  }

  _renderCard(container, card) {
    const cardComponent = new CardView(card);
    const onCardClick = () => {
      this._renderModal(card);
    };

    render(container, cardComponent);
    cardComponent.setClickHandler(onCardClick);
  }

  renderCards(cards) {
    const sortingCriterion = this._list.cardsSortingCriterion;
    if (sortingCriterion) {
      cards = cards.sort((a, b) =>
        getValue(b, sortingCriterion) - getValue(a, sortingCriterion));
    }
    for (let i = 0; i < Math.min(cards.length, this._list.cardsCountPerStep); i++) {
      this._renderCard(this._getContainer(), cards[i]);
    }
  }

  getTemplate() {
    return createListTemplate(this._list);
  }
}
