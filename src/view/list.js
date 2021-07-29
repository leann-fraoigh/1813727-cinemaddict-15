export const createListTemplate = (list) => (
  `<section class="films-list ${list.mod ? list.mod : ''}">
    <h2 class="films-list__title ${list.headerIsHidden ? 'visually-hidden' : ''}">${list.title}</h2>
    <div class="films-list__container">
    </div>
  </section>`
);
