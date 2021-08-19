const RenderPlace = {
  BEFORE_END: 'beforeend',
  AFTER_END: 'afterend',
  BEFORE_BEGIN: 'beforebegin',
  AFTER_BEGIN: 'afterbegin',
};

// Функция, рендерящая элемнт
const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPlace.AFTER_BEGIN:
      container.prepend(element);
      break;
    case RenderPlace.BEFORE_END:
      container.append(element);
      break;
  }
};

// Функция, рендерящая шаблон.
const renderTemplate = (container, element, place = RenderPlace.BEFORE_END) => {
  container.insertAdjacentHTML(place, element);
};

// Функция, создающая элемент.
const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// Функция, возвращающая рандомное булево значение.
const getRandomBoolean = () => (Boolean(getRandomInteger(0, 1)));

// Функция по переводу минут в формат "часы и минуты".
const formatRuntime = (runtime) => (
  runtime < 90 ? `${runtime}min` : `${Math.trunc(runtime/60)}h ${runtime % 60}min`
);

// Функция превращения массива в строку.
const joinArray = (arr) => (arr.join(', '));

// Функция превращения первой буквы строки в заглавную
const capitalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

// Функция превращающая строк в camelCase в обычные
const camelCaseToRegular = (string) => (
  /[A-Z]/.test(string) ? (string.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)).slice(0) : string
);

// Функция, вставляющая пробелы между разрядами в числе
const numberWithSpaces = (x) => (
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
);

export {getRandomInteger, formatRuntime, joinArray, capitalize, camelCaseToRegular, numberWithSpaces, getRandomBoolean, renderTemplate, createElement, renderElement, RenderPlace};
