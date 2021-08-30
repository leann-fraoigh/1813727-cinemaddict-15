import AbstractView from './abstract.js';

const createListTemplate = (list) => (
  `<section class="films-list ${list.mod ? list.mod : ''}">
    <h2 class="films-list__title ${list.headerIsHidden ? 'visually-hidden' : ''}">${list.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);

export default class List extends AbstractView {
  constructor(list) {
    super();
    this._element = null;
    this._list = list;
  }

  getContainer() {
    return this._element.querySelector('.films-list__container');
  }

  getTemplate() {
    return createListTemplate(this._list);
  }
}
