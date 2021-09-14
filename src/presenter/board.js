import SortingView from '../view/sorting.js';
import MainSectionView from '../view/main-section.js';
import ListPresenter from './list.js';

import {SortType} from '../const.js';
import {render} from '../utils/render';

const List = {
  MAIN: {
    isMain: true,
    title: 'All movies. Upcoming',
    headerIsHidden: true,
    cardsToGenerate: 22,
    cardsCountPerStep: 5,
    cardsSortingCriterion: SortType.DEFAULT,
  },

  RATED: {
    isMain: false,
    title: 'Top rated',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: SortType.RATING,
  },

  COMMENTED: {
    isMain: false,
    title: 'Most Commented',
    mod: 'films-list--extra',
    cardsCountPerStep: 2,
    cardsSortingCriterion: SortType.COMMENTS,
  },
};

export default class Board {
  constructor(container, cardsModel) {
    this._container = container;
    this._cardsModel = cardsModel;
    // this._sortingComponent = new SortingView();
    this._mainSectionComponent = new MainSectionView();
    this._listPresenters = new Map();

    this._handleModalChange = this._handleModalChange.bind(this);
  }

  init () {
    // render(this._container, this._sortingComponent);
    render(this._container, this._mainSectionComponent);

    this._renderLists(this._mainSectionComponent);
  }

  _renderLists(container) {
    for (const list of Object.values(List)) {
      this._listPresenter = new ListPresenter(list, container, this._cardsModel, this._handleModalChange);
      this._listPresenter.init();
      this._listPresenters.set(list.cardsSortingCriterion, this._listPresenter);
    }
  }

  _handleModalChange() {
    this._listPresenters.forEach((presenter) => presenter.closeModal());
  }
}
