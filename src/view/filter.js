import {capitalize, camelCaseToRegular} from '../utils/common.js';
import AbstractView from './abstract.js';

const ACTIVE_FILTER_CLASS = 'main-navigation__item--active';

const createFilterItemTemplate = (category, currentFilterType) => {
  const {type, name, count} = category;
  return `
    <a href="#${name}" class="main-navigation__item ${type === currentFilterType ? ACTIVE_FILTER_CLASS : ''}" data-filter-type="${type}">
      ${capitalize(camelCaseToRegular(name))}
      <span class="main-navigation__item-count">${count}</span>
    </a>`;
};

export const createFilterTemplate = (categories, currentFilterType) => {
  const navItemsTemplate = categories
    .map((category) => createFilterItemTemplate(category, currentFilterType))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filter extends AbstractView{
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.closest('a').dataset.filterType);
    console.log(evt.target.closest('a').dataset.filterType);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('click', this._filterTypeChangeHandler);
  }
}
