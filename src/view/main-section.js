import {createElement} from '../utils.js';

const createMainSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class MainSection {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMainSectionTemplate();
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

