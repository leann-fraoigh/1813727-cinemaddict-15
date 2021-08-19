import ProfileView from './view/profile.js';
import FilterView from './view/filter.js';
import SortingView from './view/sorting.js';
import MainSectionView from './view/main-section.js';
import {createListTemplate} from './view/list.js';
import {createCardTemplate} from './view/card.js';
import {createMoreBtnTemplate} from './view/more-button.js';
import {createModalTemplate} from './view/modal.js';
import FooterStatisticsView from './view/footer-statistics';
import {generateCard} from './mock/card.js';
import {generateFilters} from './mock/filters.js';
import {renderTemplate, renderElement, RenderPlace} from './utils.js';

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

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

// const cards = new Array(LIST_MAIN.cardsCount).fill().map(generateCard);
const cards = Array.from({length: LIST_MAIN.cardsCount}, generateCard);
const filters = generateFilters(cards);

// Рендер профиля
renderElement(header, new ProfileView(cards).getElement());

// Рендер меню, фильтра и основной секции
renderElement(main, new FilterView(filters).getElement());
renderElement(main, new SortingView().getElement());
renderElement(main, new MainSectionView().getElement());

// Рендер главного списка
const filmsSection = document.querySelector('.films');
renderTemplate(filmsSection, createListTemplate(LIST_MAIN));

const containerMain = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, LIST_MAIN.cardsCountPerStep); i++) {
  renderTemplate(containerMain, createCardTemplate(cards[i]));
}

// Рендер и задание функциональности кнопки Показать больше
if (cards.length > LIST_MAIN.cardsCountPerStep) {
  let renderedTaskCount = LIST_MAIN.cardsCountPerStep;

  renderTemplate(containerMain, createMoreBtnTemplate(), RenderPlace.AFTER_END);

  const loadMoreButton = filmsSection.querySelector('.films-list__show-more');

  const onLoadMoreBtn = (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + LIST_MAIN.cardsCountPerStep)
      .forEach((card) => renderTemplate(containerMain, createCardTemplate(card)));

    renderedTaskCount += LIST_MAIN.cardsCountPerStep;

    if (renderedTaskCount >= cards.length) {
      loadMoreButton.removeEventListener('click', onLoadMoreBtn);
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreBtn);
}

// Рендер второго списка
renderTemplate(filmsSection, createListTemplate(LIST_RATED));

const containerSecond = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByRating = cards.sort((a, b) =>  b.filmInfo.totalRating - a.filmInfo.totalRating);


for (let i = 0; i < LIST_RATED.cardsCount; i++) {
  renderTemplate(containerSecond, createCardTemplate(cardsSortedByRating[i]));
}

// Рендер третьего списка
renderTemplate(filmsSection, createListTemplate(LIST_COMMENTED));

const containerThird = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByComments = cards.sort((a, b) =>  b.comments.length - a.comments.length);

for (let i = 0; i < LIST_COMMENTED.cardsCount; i++) {
  renderTemplate(containerThird, createCardTemplate(cardsSortedByComments[i]));
}

// Рендер модалки
renderTemplate(footer, createModalTemplate(cards[0]), RenderPlace.AFTER_END);

// Рендер статистики в футере
renderElement(footer, new FooterStatisticsView(cards).getElement());

