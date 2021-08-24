import AbstractView from './abstract.js';

const createMainSectionTemplate = () => (
  `<section class="films">
  </section>`
);

export default class MainSection extends AbstractView {
  getTemplate() {
    return createMainSectionTemplate();
  }
}

