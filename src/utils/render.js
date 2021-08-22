import Abstract from '../view/abstract.js';

export const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
};

// Функция, рендерящая элемнт
export const render = (container, element, place = RenderPlace.BEFORE_END) => {
  if (container instanceof Abstract) {
    container = container.getElement();
  }

  if (element instanceof Abstract) {
    element = element.getElement();
  }

  switch (place) {
    case RenderPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPlace.BEFORE_END:
      container.append(element);
      break;
    case RenderPlace.BEFORE_BEGIN:
      container.before(element);
      break;
    case RenderPlace.AFTER_END:
      container.after(element);
      break;
  }
};

// Функция, создающая элемент.
export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};
