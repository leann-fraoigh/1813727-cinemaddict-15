import AbstractObserver from '../utils/abstract-observer.js';

export default class Cards extends AbstractObserver {
  constructor() {
    super();
    this._cards = [];
  }

  setCards(cards) {
    this._cards = cards.slice();
  }

  getCards() {
    return this._cards;
  }
}
