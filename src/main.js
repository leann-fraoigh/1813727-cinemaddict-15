import ProfileView from './view/profile.js';
import FilterView from './view/filter.js';
import FooterStatisticsView from './view/footer-statistics';
import BoardPresenter from './presenter/board.js';
import CardsModel from './model/cards.js';

import {generateCard} from './mock/card.js';
import {generateFilters} from './mock/filters.js';
import {render} from './utils/render';

const CARDS_COUNT = 22;

const main = document.querySelector('.main');
const header = document.querySelector('.header');
const footer = document.querySelector('.footer');

const cards = Array.from({length: CARDS_COUNT }, generateCard);
const filters = generateFilters(cards);

const cardsModel = new CardsModel();
cardsModel.setCards(cards);

// РЕНДЕР КОМПОНЕНТОВ

// Рендер профиля
render(header, new ProfileView(cardsModel.getCards()));

// Рендер меню
render(main, new FilterView(filters));

// Рендер главного блока
const boardPresenter = new BoardPresenter(main, cardsModel);
boardPresenter.init();

// Рендер статистики в футере
render(footer, new FooterStatisticsView(cardsModel.getCards()));

