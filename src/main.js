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
import {render, RenderPlace, toggleScrollLock, getValue} from './utils.js';

const List = {
  LIST_MAIN: {
    title: 'All movies. Upcoming',
    headerIsHidden: true,
    cardsCount: 22,
    cardsCountPerStep: 5,
  },

  LIST_RATED: {
    title: 'Top rated',
    mod: 'films-list--extra',
    cardsCount: 2,
    cardsSortingCriterion: 'filmInfo.totalRating',
  },

  LIST_COMMENTED: {
    title: 'Most Commented',
    mod: 'films-list--extra',
    cardsCount: 2,
    cardsSortingCriterion: 'comments.length',
  },
};

const body = document.querySelector('body');
const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = Array.from({length: List.LIST_MAIN.cardsCount}, generateCard);
const filters = generateFilters(cards);

// Функция рендера модаки
const renderModal = (card) => {
  const modalComponent = new ModalView(card);
  const modalCloseBtn = modalComponent.getElement().querySelector('.film-details__close-btn');

  modalCloseBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    body.removeChild(modalComponent.getElement());
    toggleScrollLock();
  });

  body.appendChild(modalComponent.getElement());
  toggleScrollLock();
};

// Функция рендера карточки
const renderCard = (cardsList, card) => {
  const cardComponent = new CardView(card);
  const modalTriggers = cardComponent.getElement().querySelectorAll('.film-card__poster, .film-card__title, .film-card__comments');

  modalTriggers.forEach((item) => {
    item.addEventListener('click', (evt) => {
      evt.preventDefault();
      renderModal(card);
    });
  });

  render(cardsList, cardComponent.getElement());
};

// Функция рендера главного списка
const renderMainList = () => {
  const filmsSection = document.querySelector('.films');

  render(filmsSection, new ListView(List.LIST_MAIN).getElement());

  const containerMain = document.querySelector('.films-list__container');

  for (let i = 0; i < Math.min(cards.length, List.LIST_MAIN.cardsCountPerStep); i++) {
    renderCard(containerMain, cards[i]);
  }

  // Рендер и задание функциональности кнопки Показать больше
  if (cards.length > List.LIST_MAIN.cardsCountPerStep) {
    let renderedTaskCount = List.LIST_MAIN.cardsCountPerStep;

    render(containerMain, new MoreBtnView().getElement(), RenderPlace.AFTER_END);

    const loadMoreButton = filmsSection.querySelector('.films-list__show-more');

    const onLoadMoreBtn = (evt) => {
      evt.preventDefault();
      cards
        .slice(renderedTaskCount, renderedTaskCount + List.LIST_MAIN.cardsCountPerStep)
        .forEach((card) => renderCard(containerMain, card));

      renderedTaskCount += List.LIST_MAIN.cardsCountPerStep;

      if (renderedTaskCount >= cards.length) {
        loadMoreButton.removeEventListener('click', onLoadMoreBtn);
        loadMoreButton.remove();
      }
    };

    loadMoreButton.addEventListener('click', onLoadMoreBtn);
  }
};

// Функция рендера дополнительного списка
const renderAdditionalList = (listInfo = List.LIST_RATED) => {
  const sortCriterion = listInfo.cardsSortingCriterion;
  const cardsCount = listInfo.cardsCount;
  const filmsSection = document.querySelector('.films');

  render(filmsSection, new ListView(listInfo).getElement());

  const container = document.querySelector('.films-list:last-of-type .films-list__container');

  const cardsSorted = cards.sort((a, b) =>  {
    if(getValue(a, sortCriterion) < getValue(b, sortCriterion)) {
      return 1;
    }
    if(getValue(a, sortCriterion) > getValue(b, sortCriterion)) {
      return -1;
    }
    return 0;
  });

  for (let i = 0; i < cardsCount; i++) {
    renderCard(container, cardsSorted[i]);
  }
};

// РЕНДЕР КОМПОНЕНТОВ

// Рендер профиля
render(header, new ProfileView(cards).getElement());

// Рендер меню, фильтра и основной секции
render(main, new FilterView(filters).getElement());
render(main, new SortingView().getElement());
render(main, new MainSectionView().getElement());

// Рендер главного списка
renderMainList();

// Рендер дополнительных списков
renderAdditionalList(List.LIST_RATED);
renderAdditionalList(List.LIST_COMMENTED);

// Рендер статистики в футере
render(footer, new FooterStatisticsView(cards).getElement());

