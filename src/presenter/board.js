import SortingView from '../view/sorting.js';
import MainSectionView from '../view/main-section.js';
import ListPresenter from './list.js';

import {render} from '../utils/render';

const List = {
  MAIN: {
    isMain: true,
    title: 'All movies. Upcoming',
    headerIsHidden: true,
    cardsToGenerate: 22,
    cardsCountPerStep: 5,
  },

  RATED: {
    isMain: false,
    title: 'Top rated',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: 'filmInfo.totalRating',
  },

  COMMENTED: {
    isMain: false,
    title: 'Most Commented',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: 'comments.length',
  },
};

export default class Board {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;
    this._sortingComponent = new SortingView();
    this._mainSectionComponent = new MainSectionView();
  }

  init () {
    this._cards = this._getCards();

    render(this._container, this._sortingComponent);
    render(this._container, this._mainSectionComponent);

    this._renderLists(this._mainSectionComponent);
  }

  _renderLists(container) {
    for (const list of Object.values(List)) {
      this._mainListPresenter = new ListPresenter(list, container);
      this._mainListPresenter.init(this._cards);
    }
  }

  _getCards() {
    return this._cardsModel.getCards();
  }
}
