import {numberWithSpaces} from '../utils.js';

export const createFooterStatisticsTemplate = (cards) => (
  `<section class="footer__statistics">
    <p>${numberWithSpaces(cards.length)} movies inside</p>
  </section>`
);
