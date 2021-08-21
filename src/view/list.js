import {createElement} from '../utils.js';

const createListTemplate = (list) => (
  `<section class="films-list ${list.mod ? list.mod : ''}">
    <h2 class="films-list__title ${list.headerIsHidden ? 'visually-hidden' : ''}">${list.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class List {
  constructor(list) {
    this._element = null;
    this._list = list;
  }

  getTemplate() {
    return createListTemplate(this._list);
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

  getContainer() {
    return this._element.querySelector('.films-list__container');
  }
}
