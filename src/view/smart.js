import Abstract from './abstract';

export default class Smart extends Abstract {
  constructor() {
    super();
    this._data = {};
  }

  updateData(update, justDataUpdating) {
    if (!update) {
      return;
    }
    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    if (justDataUpdating) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const scrollPosition = this.getScrollPosition();
    const prevElement = this.getElement();

    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.setScrollPosition(scrollPosition);

    this.restoreHandlers();
  }

  getScrollPosition() {
    return Math.round(this._element.scrollTop);
  }

  setScrollPosition(scrollPosition) {
    this._element.scrollTo(0, scrollPosition);
  }

  restoreHandlers() {
    throw new Error('Abstract method not implemented: resetHandlers');
  }
}
