/* eslint-disable comma-dangle */
import {getRandomInteger} from '../utils.js';
import {AGE_RATINGS, GENRES} from '../const.js';

const generateDate = () => (
  getRandomInteger((Date.parse('14 OCT 1888 GMT')), Date.now())
);

const generateRandomList = (range, originalList) => {
  const randomNumber = getRandomInteger(range[0], range[1]);

  const pickRandomElement = () => {
    const randomIndex = getRandomInteger(0, originalList.length - 1);
    return originalList[randomIndex];
  };

  const generatedList = new Array(randomNumber).fill().map(pickRandomElement);
  const generatedString = `${generatedList.join(', ')}.`;

  return generatedString;
};

const generateTitle = () => {
  const titles = ['It', 'Birdman Or (The Unexpected Virtue Of Ignorance)', 'Psycho', 'The Assassination Of Jesse James By The Coward Robert Ford', 'Citizen Cane', 'Bladerunner', 'Casablanca', 'The Day The Earth Stood Still',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateAltTitle = () => {
  const titles = [
    'It',
    'The Unexpected Virtue Of Ignorance',
    'Psycho',
  ];

  const randomIndex = getRandomInteger(0, 6);

  const altTitle = randomIndex > 2 ? '' : titles.randomIndex;

  return altTitle;
};

const generatePoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateAgeRating = () => (
  AGE_RATINGS[getRandomInteger(0, AGE_RATINGS.length - 1)]
);

const generateRuntime = () => (
  getRandomInteger(15, 1260)
);

const NAMES = ['Robert De Niro', 'Jack Nicholson', 'Denzel Washington', 'Katharine Hepburn', 'Humphrey Bogart', 'Meryl Streep', 'Liv Tyler', 'Jill Scott', 'Bob Saget', 'Arnold Schwarzenegger', 'Kiefer William Rufus Sutherland', 'Kiefer William Sutherland'];

const generatedActors = generateRandomList([1, 6], NAMES);
const generatedWriters = generateRandomList([1, 3], NAMES);

const generatedGenres = generateRandomList([1, 5], GENRES);

const generateDirector = () => (
  NAMES[getRandomInteger(0, NAMES.length - 1)]
);

const COUNTRIES = ['Bosnia Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep'];

const generateReleaseCountry = () => (
  COUNTRIES[getRandomInteger(0, COUNTRIES.length - 1)]
);

const generateRating = () => {
  const randomRating = getRandomInteger(0, 99) / 10;

  return randomRating;
};

const generateDescription = () => {
  const mockSentences = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.'.replace(/\.\s+/g,'.').split(/\./).filter(Boolean);

  const randomNumber = getRandomInteger(1, 5);
  const generatedDescription = [];

  for (let i = 0; i < randomNumber; i++) {
    const randomIndex = getRandomInteger(0, mockSentences.length - 1);
    generatedDescription.push(mockSentences[randomIndex]);
  }

  const description = `${generatedDescription.join('. ')}.`;

  return description;
};

// console.log(generateDescription);

export const generateCard = () => ({
  id: Boolean(getRandomInteger(0, 1000)),
  comments: [
    123, 123
  ],
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateAltTitle(),
    totalRating: generateRating(),
    poster: generatePoster(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generatedWriters,
    actors: generatedActors,
    release: {
      date: generateDate(),
      releaseCountry: generateReleaseCountry(),
    },
    runtime: generateRuntime(),
    genre: generatedGenres,
    description: generateDescription(),
  },
  userDetails: {
    watchlist: Boolean(getRandomInteger(0, 1)),
    alreadyWatched: Boolean(getRandomInteger(0, 1)),
    watchingDate: '2019-04-12T16:12:32.554Z',
    favorite: Boolean(getRandomInteger(0, 1)),
  }
});
