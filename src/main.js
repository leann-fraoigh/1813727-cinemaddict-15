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
import {render, RenderPlace} from './utils.js';

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

const cards = Array.from({length: LIST_MAIN.cardsCount}, generateCard);
const filters = generateFilters(cards);

// Функция рендера карточки
const renderCard = (cardsList, card) => {
  const cardComponent = new CardView(card);

  render(cardsList, cardComponent.getElement());
};

// Рендер профиля
render(header, new ProfileView(cards).getElement());

// Рендер меню, фильтра и основной секции
render(main, new FilterView(filters).getElement());
render(main, new SortingView().getElement());
render(main, new MainSectionView().getElement());

// Рендер главного списка
const filmsSection = document.querySelector('.films');
render(filmsSection, new ListView(LIST_MAIN).getElement());

const containerMain = document.querySelector('.films-list__container');

for (let i = 0; i < Math.min(cards.length, LIST_MAIN.cardsCountPerStep); i++) {
  renderCard(containerMain, cards[i]);
}

// Рендер и задание функциональности кнопки Показать больше
if (cards.length > LIST_MAIN.cardsCountPerStep) {
  let renderedTaskCount = LIST_MAIN.cardsCountPerStep;

  render(containerMain, new MoreBtnView().getElement(), RenderPlace.AFTER_END);

  const loadMoreButton = filmsSection.querySelector('.films-list__show-more');

  const onLoadMoreBtn = (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + LIST_MAIN.cardsCountPerStep)
      .forEach((card) => renderCard(containerMain, card));

    renderedTaskCount += LIST_MAIN.cardsCountPerStep;

    if (renderedTaskCount >= cards.length) {
      loadMoreButton.removeEventListener('click', onLoadMoreBtn);
      loadMoreButton.remove();
    }
  };

  loadMoreButton.addEventListener('click', onLoadMoreBtn);
}

// Рендер второго списка
render(filmsSection, new ListView(LIST_RATED).getElement());

const containerSecond = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByRating = cards.sort((a, b) =>  b.filmInfo.totalRating - a.filmInfo.totalRating);


for (let i = 0; i < LIST_RATED.cardsCount; i++) {
  renderCard(containerSecond, cardsSortedByRating[i]);
}

// Рендер третьего списка
render(filmsSection, new ListView(LIST_COMMENTED).getElement());


const containerThird = document.querySelector('.films-list:last-of-type .films-list__container');

const cardsSortedByComments = cards.sort((a, b) =>  b.comments.length - a.comments.length);

for (let i = 0; i < LIST_COMMENTED.cardsCount; i++) {
  renderCard(containerThird, cardsSortedByComments[i]);
}

// Рендер модалки
render(footer, new ModalView(cards[0]).getElement(), RenderPlace.AFTER_END);

// Рендер статистики в футере
render(footer, new FooterStatisticsView(cards).getElement());

