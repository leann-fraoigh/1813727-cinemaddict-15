import ListView from '../view/list.js';
import MoreBtnView from '../view/more-button';
import CardPresenter from './card.js';

import {remove, render, RenderPlace} from '../utils/render';
import {sortByRating, sortByDate, sortByComments} from '../utils/card.js';
import {SortType, UserAction, UpdateType} from '../const.js';

export default class List {
  constructor(list, container, cardsModel) {
    this._list = list;
    this._listContainer = container;
    this._cardsModel = cardsModel;
    this._renderedCardCount = this._list.cardsCountPerStep;
    this._currentSortType = SortType.DEFAULT;

    this._cardPresenter = new Map();
    this._loadMoreButtonComponent = new MoreBtnView();

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._handleModalChange = this._handleModalChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._cardsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._listElement = new ListView(this._list);
    render(this._listContainer, this._listElement);

    this._renderList();
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._listElement.getContainer(), this._handleViewAction, this._handleModalChange);
    cardPresenter.init(card);
    this._cardPresenter.set(card.id, cardPresenter);
  }

  _renderLoadMoreBtn() {
    render(this._listElement.getContainer(), this._loadMoreButtonComponent, RenderPlace.AFTER_END);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  _handleLoadMoreBtnClick() {
    this._renderCards(this._getCards().slice(this._renderedCardCount, this._renderedCardCount + this._list.cardsCountPerStep));

    this._renderedCardCount += this._list.cardsCountPerStep;

    if (this._renderedCardCount >= this._getCards().length) {
      this._loadMoreButtonComponent.getElement().remove();
      this._loadMoreButtonComponent.removeElement();
    }
  }

  _handleModalChange() {
    this._cardPresenter.forEach((presenter) => presenter.closeModal());
  }

  _handleViewAction(actionType, updateType, update) {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_CARD:
        this._cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_CARD:
        this._cardsModel.addCard(updateType, update);
        break;
      case UserAction.DELETE_CARD:
        this._cardsModel.deleteCard(updateType, update);
        break;
    }
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(card));
  }

  _renderCardsList() {
    this._currentSortType = this._list.cardsSortingCriterion;
    const cards = this._getCards();
    const isMainList = this._list.isMain;
    this._renderCards(cards.slice(0, Math.min(cards.length, this._renderedCardCount)));

    if (isMainList && cards.length > this._list.cardsCountPerStep) {
      this._renderLoadMoreBtn();
    }
  }

  // _handleSortTypeChange(sortType) {
  //   if (this._currentSortType === sortType) {
  //     return;
  //   }

  //   this._currentSortType = sortType;
  //   this._clearCardList();
  //   this._renderCardList();
  // }

  _getCards() {
    switch (this._currentSortType) {
      case SortType.RATING:
        return this._cardsModel.getCards().slice().sort(sortByRating);
      case SortType.DATE:
        return this._cardsModel.getCards().slice().sort(sortByDate);
      case SortType.COMMENTS:
        return this._cardsModel.getCards().slice().sort(sortByComments);
    }

    return this._cardsModel.getCards();
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      // case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        // this._cardPresenter.get(data.id).init(data);
        // break;
      case UpdateType.MINOR:
        // - обновить списки (изменение статусов)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (добавление или удаление комментария)
        this._clearList();
        this._renderList();
        break;
    }
  }

  _clearList({resetRenderedCardCount = false, resetSortType = false} = {}) {
    const cardCount = this._getCards().length;

    this._cardPresenter.forEach((presenter) => presenter.destroy());
    this._cardPresenter.clear();

    remove(this._loadMoreButtonComponent);

    if (resetRenderedCardCount) {
      this._renderedCardCount = this._list.cardsCountPerStep;
    } else {
      this._renderedCardCount = Math.min(cardCount, this._renderedCardCount);
    }

    if (resetSortType) {
      // this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderList() {
    this._renderCardsList();
  }
}
