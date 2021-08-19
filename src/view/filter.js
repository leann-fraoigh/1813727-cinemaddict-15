import {capitalize, camelCaseToRegular, createElement} from '../utils.js';

const ACTIVE_FILTER_CLASS = 'main-navigation__item--active';

const createFilterItemTemplate = (category, isActive) => {
  const {name, count} = category;
  return `
    <a href="#${name}" class="main-navigation__item ${isActive ? ACTIVE_FILTER_CLASS : ''}">
      ${capitalize(camelCaseToRegular(name))}
      <span class="main-navigation__item-count">${count.length}</span>
    </a>`;
};

export const createFilterTemplate = (categories) => {
  const navItemsTemplate = categories
    .map((category, index) => createFilterItemTemplate(category, index === 1))
    .join('');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${navItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class Filter {
  constructor(filters) {
    this._element = null;
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTemplate(this._filters);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
