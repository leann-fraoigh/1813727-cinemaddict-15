import {createProfileTemplate} from './view/profile.js';
import {createSiteMenuTemplate} from './view/menu.js';
import {createFilterTemplate} from './view/filter.js';
import {createMainSectionTemplate} from './view/main-section.js';
import {createListTemplate} from './view/list.js';
import {createCardTemplate} from './view/card.js';
import {createMoreBtnTemplate} from './view/more-button.js';
import {createModalTemplate} from './view/modal.js';

const LIST_MAIN = {
  title: 'All movies. Upcoming',
  headerIsHidden: true,
  cardsCount: 5,
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

const render = (container, element, place) => {
  container.insertAdjacentHTML(place, element);
};

// Рендер профиля
render(header, createProfileTemplate(), 'beforeend');

// Рендер меню, фильтра и основной секции
render(main, createSiteMenuTemplate(), 'beforeend');
render(main, createFilterTemplate(), 'beforeend');
render(main, createMainSectionTemplate(), 'beforeend');

// Рендер главного списка
const filmsSection = document.querySelector('.films');
render(filmsSection, createListTemplate(LIST_MAIN), 'beforeend');

const containerMain = document.querySelector('.films-list__container');

for (let i = 0; i < LIST_MAIN.cardsCount; i++) {
  render(containerMain, createCardTemplate(), 'beforeend');
}

render(containerMain, createMoreBtnTemplate(), 'afterend');

// Рендер второго списка
render(filmsSection, createListTemplate(LIST_RATED), 'beforeend');

const containerSecond = document.querySelector('.films-list:last-of-type .films-list__container');

for (let i = 0; i < LIST_RATED.cardsCount; i++) {
  render(containerSecond, createCardTemplate(), 'beforeend');
}

// Рендер третьего списка
render(filmsSection, createListTemplate(LIST_COMMENTED), 'beforeend');

const containerThird = document.querySelector('.films-list:last-of-type .films-list__container');

for (let i = 0; i < LIST_COMMENTED.cardsCount; i++) {
  render(containerThird, createCardTemplate(), 'beforeend');
}

// Рендер модалки
render(footer, createModalTemplate(), 'afterend');
