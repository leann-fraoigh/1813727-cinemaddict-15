import ListView from '../view/list.js';
import SortView from '../view/sorting.js';
import MoreBtnView from '../view/more-button';
import CardPresenter from './card.js';
import ModalPresenter from './modal.js';

import {remove, render, RenderPlace} from '../utils/render';
import {filter} from '../utils/filter.js';
import {sortByRating, sortByDate, sortByComments} from '../utils/card.js';
import {SortType, UserAction, UpdateType} from '../const.js';

export default class List {
  constructor(list, container, cardsModel, filterModel, closeAllModals) {
    this._list = list;
    this._listContainer = container;
    this._cardsModel = cardsModel;
    this._filterModel = filterModel;
    this._closeAllModals = closeAllModals;
    this._renderedCardCount = this._list.cardsCountPerStep;
    this._currentSortType = this._list.cardsSortingCriterion;

    this._modal = null;
    this._loadMoreButtonComponent = new MoreBtnView();
    this._sortComponent = null;
    this._cardPresenter = new Map();
    this._modalPresenter = null;

    this._handleLoadMoreBtnClick = this._handleLoadMoreBtnClick.bind(this);
    this._openModal = this._openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._listElement = new ListView(this._list);
    render(this._listContainer, this._listElement);

    if (this._list.isMain) {
      this._renderSort();
    }

    this._renderList();
  }

  // Методы, касающиеся списка карточек

  _getCards() {
    const filterType = this._filterModel.getFilter();
    const cards = this._cardsModel.getCards();
    const filtredCards = filter[filterType](cards);

    switch (this._currentSortType) {
      case SortType.RATING:
        return filtredCards.sort(sortByRating);
      case SortType.DATE:
        return filtredCards.sort(sortByDate);
      case SortType.COMMENTS:
        return filtredCards.sort(sortByComments);
    }

    return this._cardsModel.getCards();
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
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderCard(card) {
    const cardPresenter = new CardPresenter(this._listElement.getContainer(), this._handleViewAction, this._openModal, this._setModal);
    cardPresenter.init(card);
    this._cardPresenter.set(card.id, cardPresenter);
  }

  _renderCards(cards) {
    cards.forEach((card) => this._renderCard(card));
  }

  _renderCardsList() {
    const cards = this._getCards();
    const isMainList = this._list.isMain;
    this._renderCards(cards.slice(0, Math.min(cards.length, this._renderedCardCount)));

    if (isMainList && cards.length > this._list.cardsCountPerStep) {
      this._renderLoadMoreBtn();
    }
  }

  _renderList() {
    this._renderCardsList();
  }

  // Методы, касающиеся кнопки Показать больше

  _handleLoadMoreBtnClick() {
    this._renderCards(this._getCards().slice(this._renderedCardCount, this._renderedCardCount + this._list.cardsCountPerStep));

    this._renderedCardCount += this._list.cardsCountPerStep;

    if (this._renderedCardCount >= this._getCards().length) {
      this._loadMoreButtonComponent.getElement().remove();
      this._loadMoreButtonComponent.removeElement();
    }
  }

  _renderLoadMoreBtn() {
    render(this._listElement.getContainer(), this._loadMoreButtonComponent, RenderPlace.AFTER_END);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreBtnClick);
  }

  // Методы, касающиеся модалки

  _openModal(card) {
    this._closeAllModals();
    this._modalPresenter = new ModalPresenter(card, this._handleViewAction, this.closeModal);
    this._modalPresenter.init();
  }

  closeModal() {
    if (this._modalPresenter) {
      this._modalPresenter.destroy();
      this._modalPresenter = null;
    }
  }

  _updateModal() {
    if (this._modalPresenter) {
      const index = this._cardsModel._cards.findIndex((card) => card.id === this._modalPresenter._card.id);
      const currentlyOpenMovie = this._cardsModel._cards[index];
      this.closeModal();
      this._openModal(currentlyOpenMovie);
    }
  }

  // Методы, касающиеся сортировки

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearList();
    this._renderList();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._listContainer, this._sortComponent, RenderPlace.AFTER_BEGIN);
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
        this._updateModal();
        break;
    }
  }
}
