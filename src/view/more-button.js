import AbstractView from './abstract.js';

const createMoreBtnTemplate = () => (
  '<button class="films-list__show-more">Show more</button>'
);


export default class MoreBtn extends AbstractView {
  getTemplate() {
    return createMoreBtnTemplate();
  }
}
