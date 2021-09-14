import ProfileView from './view/profile.js';
// import FilterView from './view/filter.js';
import FooterStatisticsView from './view/footer-statistics';
import BoardPresenter from './presenter/board.js';
import FilterPresenter from './presenter/filter.js';
import CardsModel from './model/cards.js';
import FilterModel from './model/filter.js';

import {generateCard} from './mock/card.js';
// import {generateFilters} from './mock/filters.js';
import {render} from './utils/render';

const CARDS_COUNT = 22;

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = Array.from({length: CARDS_COUNT }, generateCard);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

// const filters = generateFilters(cardsModel.getCards());

const filterModel = new FilterModel();
// РЕНДЕР КОМПОНЕНТОВ

// Рендер профиля
render(header, new ProfileView(cardsModel.getCards()));

// Рендер меню
// render(main, new FilterView(filters, 'all'));
const filterPresenter = new FilterPresenter(main, filterModel, cardsModel);
filterPresenter.init();

// Рендер главного блока

const boardPresenter = new BoardPresenter(main, cardsModel, filterModel);
boardPresenter.init();

// Рендер статистики в футере
render(footer, new FooterStatisticsView(cardsModel.getCards()));

