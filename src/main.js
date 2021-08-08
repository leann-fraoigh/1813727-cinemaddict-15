import {createProfileTemplate} from './view/profile.js';
import {createFilterTemplate} from './view/filter.js';
import {createSortingTemplate} from './view/sorting.js';
import {createMainSectionTemplate} from './view/main-section.js';
import {createListTemplate} from './view/list.js';
import {createCardTemplate} from './view/card.js';
import {createMoreBtnTemplate} from './view/more-button.js';
import {createModalTemplate} from './view/modal.js';
import {createFooterStatisticsTemplate} from './view/footer-statistics';
import {generateCard} from './mock/card.js';
import {generateFilters} from './mock/filters.js';

const LIST_MAIN = {
  title: 'All movies. Upcoming',
  headerIsHidden: true,
  cardsCount: 22,
  cardsCountPerStep: 5,
};

const LIST_RATED = {
  title: 'Top rated',
  mod: 'films-list--extra',
  cardsCount: 2,
};

const LIST_COMMENTED = {
  title: 'Most Commented',
  mod: 'films-list--extra',
  cardsCount: 2,
};

const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
};

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = new Array(LIST_MAIN.cardsCount).fill().map(generateCard);
const filters = generateFilters(cards);

const render = (container, element, place = RenderPlace.BEFORE_END) => {
  container.insertAdjacentHTML(place, element);
};

// Рендер профиля
render(header, createProfileTemplate(cards));

// Рендер меню, фильтра и основной секции
render(main, createFilterTemplate(filters));
render(main, createSortingTemplate());
render(main, createMainSectionTemplate());

// Рендер главного списка
const filmsSection = document.querySelector('.films');
render(filmsSection, createListTemplate(LIST_MAIN));

const containerMain = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, LIST_MAIN.cardsCountPerStep); i++) {
  render(containerMain, createCardTemplate(cards[i]));
}

// Рендер и задание функциональности кнопки Показать больше
if (cards.length > LIST_MAIN.cardsCountPerStep) {
  let renderedTaskCount = LIST_MAIN.cardsCountPerStep;

  render(containerMain, createMoreBtnTemplate(), RenderPlace.AFTER_END);

  const loadMoreButton = filmsSection.querySelector('.films-list__show-more');

  const onLoadMoreBtn = (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + LIST_MAIN.cardsCountPerStep)
      .forEach((card) => render(containerMain, createCardTemplate(card)));

    renderedTaskCount += LIST_MAIN.cardsCountPerStep;

    if (renderedTaskCount >= cards.length) {
      loadMoreButton.removeEventListener('click', onLoadMoreBtn);
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreBtn);
}

// Рендер второго списка
render(filmsSection, createListTemplate(LIST_RATED));

const containerSecond = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByRating = cards.sort((a, b) =>  b.filmInfo.totalRating * 10 - a.filmInfo.totalRating * 10);

for (let i = 0; i < LIST_RATED.cardsCount; i++) {
  render(containerSecond, createCardTemplate(cardsSortedByRating[i]));
}

// Рендер третьего списка
render(filmsSection, createListTemplate(LIST_COMMENTED));

const containerThird = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByComments = cards.sort((a, b) =>  b.comments.length - a.comments.length);

for (let i = 0; i < LIST_COMMENTED.cardsCount; i++) {
  render(containerThird, createCardTemplate(cardsSortedByComments[i]));
}

// Рендер модалки
render(footer, createModalTemplate(cards[0]), RenderPlace.AFTER_END);

// Рендер статистики в футере
render(footer, createFooterStatisticsTemplate(cards));
