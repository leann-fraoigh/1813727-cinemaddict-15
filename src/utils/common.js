export const ScrollState = {
  on: 'on',
  off: 'off',
};

// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};


// Функция, возвращающая рандомное булево значение.
export const getRandomBoolean = () => (Boolean(getRandomInteger(0, 1)));

// Функция по переводу минут в формат "часы и минуты".
export const formatRuntime = (runtime) => (
  runtime < 90 ? `${runtime}min` : `${Math.trunc(runtime/60)}h ${runtime % 60}min`
);

// Функция превращения массива в строку.
export const joinArray = (arr) => (arr.join(', '));

// Функция превращения первой буквы строки в заглавную
export const capitalize = (string) => (
  string.charAt(0).toUpperCase() + string.slice(1)
);

// Функция превращающая строк в camelCase в обычные
export const camelCaseToRegular = (string) => (
  /[A-Z]/.test(string) ? (string.replace(/[A-Z]/g, (letter) => ` ${letter.toLowerCase()}`)).slice(0) : string
);

// Функция, вставляющая пробелы между разрядами в числе
export const numberWithSpaces = (x) => (
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
);

// Функция, предотвращающая двойной скролл
export const setScrollLockState = (state) => {
  switch (state) {
    case ScrollState.on:
      document.querySelector('body').classList.add('hide-overflow');
      break;
    case ScrollState.off:
      document.querySelector('body').classList.remove('hide-overflow');
      break;
  }
};

// Функция из интернета для получения значений по [сложному] ключу-строке
// Источник: https://it.knightnet.org.uk/kb/node-js/get-properties/
// export const getValue = (obj, prop) => (
//   prop.split('.').reduce((prev, curr) => (
//     prev ? prev[curr] : undefined
//   ), obj || self)
// );

// export const updateItem = (items, update) => {
//   const index = items.findIndex((item) => item.id === update.id);

//   if (index === -1) {
//     return items;
//   }

//   return [
//     ...items.slice(0, index),
//     update,
//     ...items.slice(index + 1),
//   ];
// };
