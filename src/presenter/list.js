import ListView from '../view/list.js';
import MoreBtnView from '../view/more-button';
import CardPresenter from './card.js';

import {getValue, updateItem} from '../utils/common.js';
import {render, RenderPlace} from '../utils/render';

export default class List {
  constructor(list, container) {
    this._list = list;
    this._listContainer = container;
    this._renderedCardCount = this._list.cardsCountPerStep;

    this._cardPresenter = new Map();
    this._loadMoreButtonComponent = new MoreBtnView();

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleCardChange = this._handleCardChange.bind(this);
    this._handleModalChange = this._handleModalChange.bind(this);
  }

  init(cards) {
    this._cards = cards.slice();
    this._soursedCards = cards.slice();

    this._listElement = new ListView(this._list);
    render(this._listContainer, this._listElement);

    this._renderCardsList(this._cards);
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._listElement.getContainer(), this._handleCardChange, this._handleModalChange);
    cardPresenter.init(card);
    this._cardPresenter.set(card.id, cardPresenter);
  }

  _renderLoadMoreBtn() {
    render(this._listElement.getContainer(), this._loadMoreButtonComponent, RenderPlace.AFTER_END);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _handleLoadMoreBtnClick() {
    this._renderCards(this._renderedCardCount, this._renderedCardCount + this._list.cardsCountPerStep);

    this._renderedCardCount += this._list.cardsCountPerStep;

    if (this._renderedCardCount >= this._cards.length) {
      this._loadMoreButtonComponent.getElement().remove();
      this._loadMoreButtonComponent.removeElement();
    }
  }

  _handleModalChange() {
    this._cardPresenter.forEach((presenter) => presenter.closeModal());
  }

  _handleCardChange(updatedCard) {
    this._cards = updateItem(this._cards, updatedCard);
    this._cardPresenter.get(updatedCard.id).init(updatedCard);
  }

  _renderCards(from, to) {
    this._cards
      .slice(from, to)
      .forEach((card) => this._renderCard(card));
  }

  _renderCardsList(cards) {
    const sortingCriterion = this._list.cardsSortingCriterion;
    const isMainList = this._list.isMain;

    if (sortingCriterion) {
      this._cards = this._cards.sort((a, b) =>
        getValue(b, sortingCriterion) - getValue(a, sortingCriterion));
    }

    this._renderCards(0, Math.min(this._cards.length, this._list.cardsCountPerStep));

    if (isMainList && cards.length > this._list.cardsCountPerStep) {
      this._renderLoadMoreBtn();
    }
  }

  // _clearCardList() {
  //   this._cardPresenter.forEach((presenter) => presenter.destroy());
  //   this._cardPresenter.clear();
  //   this._renderedCardCount = this._list.cardsCountPerStep;
  //   remove(this._loadMoreButtonComponent);
  // }
}
