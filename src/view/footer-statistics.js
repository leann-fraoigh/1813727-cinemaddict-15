import {numberWithSpaces} from '../utils/common.js';
import AbstractView from './abstract.js';

const createFooterStatisticsTemplate = (cards) => (
  `<section class="footer__statistics">
    <p>${numberWithSpaces(cards.length)} movies inside</p>
  </section>`
);

export default class FooterStatistics extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
  }
}
