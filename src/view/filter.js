import {capitalize, camelCaseToRegular} from '../utils.js';

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
