import ProfileView from './view/profile.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import MainSectionView from './view/main-section.js';
import ListView from './view/list.js';
import CardView from './view/card.js';
import MoreBtnView from './view/more-button.js';
import ModalView from './view/modal.js';
import FooterStatisticsView from './view/footer-statistics';
import {generateCard} from './mock/card.js';
import {generateFilters} from './mock/filters.js';
import {ScrollState, setScrollLockState} from './utils/common.js';
import {render, RenderPlace} from './utils/render';

const List = {
  LIST_MAIN: {
    isMain: true,
    title: 'All movies. Upcoming',
    headerIsHidden: true,
    cardsToGenerate: 22,
    cardsCountPerStep: 5,
  },

  LIST_RATED: {
    isMain: false,
    title: 'Top rated',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: 'filmInfo.totalRating',
  },

  LIST_COMMENTED: {
    isMain: false,
    title: 'Most Commented',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: 'comments.length',
  },
};

const body = document.querySelector('body');
const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = Array.from({length: List.LIST_MAIN.cardsToGenerate}, generateCard);
const filters = generateFilters(cards);

// Функция рендера модаки
const renderModal = (card) => {
  const modalComponent = new ModalView(card);

  body.appendChild(modalComponent.getElement());
  setScrollLockState(ScrollState.on);

  const onCloseBtnClick = () => {
    body.removeChild(modalComponent.getElement());
    setScrollLockState(ScrollState.off);
  };

  modalComponent.setCloseBtnClickHandler(onCloseBtnClick);
};

// Функция рендера карточки
const renderCard = (cardsList, card) => {
  const cardComponent = new CardView(card);
  const onCardClick = () => {
    renderModal(card);
  };

  render(cardsList, cardComponent);
  cardComponent.setClickHandler(onCardClick);
};

// Функция рендера главного списка
const renderMainList = () => {
  const filmsSection = document.querySelector('.films');
  const listElement = new ListView(List.LIST_MAIN);

  render(filmsSection, listElement);

  listElement.renderCards(cards);

  // Рендер и задание функциональности кнопки Показать больше
  if (cards.length > List.LIST_MAIN.cardsCountPerStep) {
    let renderedTaskCount = List.LIST_MAIN.cardsCountPerStep;
    const loadMoreButtonComponent = new MoreBtnView();

    const containerMain = listElement.getContainer();
    render(containerMain, loadMoreButtonComponent, RenderPlace.AFTER_END);

    const onLoadMoreBtn = () => {
      cards
        .slice(renderedTaskCount, renderedTaskCount + List.LIST_MAIN.cardsCountPerStep)
        .forEach((card) => renderCard(containerMain, card));

      renderedTaskCount += List.LIST_MAIN.cardsCountPerStep;

      if (renderedTaskCount >= cards.length) {
        loadMoreButtonComponent.getElement().remove();
        loadMoreButtonComponent.removeElement();
      }
    };

    loadMoreButtonComponent.setClickHandler(onLoadMoreBtn);
  }
};

// Функция рендера дополнительного списка
const renderAdditionalList = (listInfo = List.LIST_RATED) => {
  const filmsSection = document.querySelector('.films');
  const listElement = new ListView(listInfo);

  render(filmsSection, listElement);

  listElement.renderCards(cards);
};

// РЕНДЕР КОМПОНЕНТОВ

// Рендер профиля
render(header, new ProfileView(cards));

// Рендер меню, фильтра и основной секции
render(main, new FilterView(filters));
render(main, new SortingView());
render(main, new MainSectionView());

// Рендер главного списка
renderMainList();

// Рендер дополнительных списков
renderAdditionalList(List.LIST_RATED);
renderAdditionalList(List.LIST_COMMENTED);

// Рендер статистики в футере
render(footer, new FooterStatisticsView(cards));

