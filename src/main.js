import {createProfileTemplate} from './view/profile.js';
import {createSiteMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createMainSectionTemplate} from './view/main-section.js';
import {createListTemplate} from './view/list.js';
import {createCardTemplate} from './view/card.js';
import {createMoreBtnTemplate} from './view/more-button.js';
import {createModalTemplate} from './view/modal.js';
import {generateCard} from './mock/card.js';

const LIST_MAIN = {
  title: 'All movies. Upcoming',
  headerIsHidden: true,
  cardsCount: 12,
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

const render = (container, element, place = RenderPlace.BEFORE_END) => {
  container.insertAdjacentHTML(place, element);
};

// Рендер профиля
render(header, createProfileTemplate());

// Рендер меню, фильтра и основной секции
render(main, createSiteMenuTemplate());
render(main, createFilterTemplate());
render(main, createMainSectionTemplate());

// Рендер главного списка
const filmsSection = document.querySelector('.films');
render(filmsSection, createListTemplate(LIST_MAIN));

const containerMain = document.querySelector('.films-list__container');

for (let i = 0; i < LIST_MAIN.cardsCount; i++) {
  render(containerMain, createCardTemplate(cards[i]));
}

render(containerMain, createMoreBtnTemplate(), 'afterend');

// Рендер второго списка
render(filmsSection, createListTemplate(LIST_RATED), 'beforeend');

const containerSecond = document.querySelector('.films-list:last-of-type .films-list__container');

for (let i = 0; i < LIST_RATED.cardsCount; i++) {
  render(containerSecond, createCardTemplate(cards[i]), 'beforeend');
}

// Рендер третьего списка
render(filmsSection, createListTemplate(LIST_COMMENTED), 'beforeend');

const containerThird = document.querySelector('.films-list:last-of-type .films-list__container');

for (let i = 0; i < LIST_COMMENTED.cardsCount; i++) {
  render(containerThird, createCardTemplate(cards[i]), 'beforeend');
}

// Рендер модалки
render(footer, createModalTemplate(cards[0]), 'afterend');
