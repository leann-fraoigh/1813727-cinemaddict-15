import {getRandomInteger, getRandomBoolean} from '../utils/common.js';
import {AGE_RATINGS, GENRES, EMOTICONS} from '../const.js';

const generateReleaseDate = () => (
  getRandomInteger((Date.parse('14 OCT 1888 GMT')), Date.now())
);

const pickRandomElement = (originalList) => {
  const randomIndex = getRandomInteger(0, originalList.length - 1);
  return originalList[randomIndex];
};

const generateRandomList = (originalList, max, min = 1) => {
  const listLength = getRandomInteger(min, max);

  const generatedList = new Array(listLength).fill().map(pickRandomElement.bind(null, originalList));

  return generatedList;
};

const generateTitle = () => {
  const titles = [
    'It',
    'Birdman Or (The Unexpected Virtue Of Ignorance)',
    'Psycho',
    'The Assassination Of Jesse James By The Coward Robert Ford',
    'Citizen Cane',
    'Bladerunner',
    'Casablanca',
    'The Day The Earth Stood Still',
  ];

  return pickRandomElement(titles);
};

const generateAltTitle = () => {
  const titles = [
    'It',
    'The Unexpected Virtue Of Ignorance',
    'Psycho',
  ];

  titles.length = 6;

  return pickRandomElement(titles) || '';
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

  return pickRandomElement(posters);
};

const generateAgeRating = () => (
  pickRandomElement(AGE_RATINGS)
);

const generateRuntime = () => (
  getRandomInteger(15, 1260)
);

const NAMES = ['Robert De Niro', 'Jack Nicholson', 'Denzel Washington', 'Katharine Hepburn', 'Humphrey Bogart', 'Meryl Streep', 'Liv Tyler', 'Jill Scott', 'Bob Saget', 'Arnold Schwarzenegger', 'Kiefer William Rufus Sutherland', 'Kiefer William Sutherland'];

const generateActors = () => (generateRandomList(NAMES, 6));
const generateWriters = () => (generateRandomList(NAMES, 3));

const generateGenres = () => (generateRandomList(GENRES, 5));

const generateDirector = () => (pickRandomElement(NAMES)  );

const COUNTRIES = ['Bosnia Herzegovina', 'Botswana', 'Brazil', 'Brunei', 'Bulgaria', 'Burkina', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Central African Rep'];

const generateReleaseCountry = () => (pickRandomElement(COUNTRIES));

const generateEmoticone = () => (pickRandomElement(EMOTICONS));

const generateRating = () => {
  const randomRating = getRandomInteger(0, 99) / 10;

  return randomRating;
};

const LOREM_IPSUM = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';

const generateDescription = () => {
  const mockSentences = LOREM_IPSUM
    .replace(/\.\s+/g,'.')
    .split(/\./)
    .filter(Boolean);

  const generatedDescription = generateRandomList(mockSentences, 5);

  const description = `${generatedDescription.join('. ')}.`;

  return description;
};

const generateComments = () => {
  const numberOfComments = getRandomInteger(0, 5);
  const generateComment = () => (
    {
      id: getRandomInteger(0, 1000),
      author: generateDirector(),
      comment: generateDescription(),
      date: generateReleaseDate(),
      emoticon: generateEmoticone(),
    }
  );

  const generatedComments = new Array(numberOfComments).fill().map(generateComment);

  return generatedComments;
};

export const generateCard = () => ({
  id: getRandomInteger(0, 1000),
  filmInfo: {
    title: generateTitle(),
    alternativeTitle: generateAltTitle(),
    totalRating: generateRating(),
    poster: generatePoster(),
    ageRating: generateAgeRating(),
    director: generateDirector(),
    writers: generateWriters(),
    actors: generateActors(),
    release: {
      date: generateReleaseDate(),
      releaseCountry: generateReleaseCountry(),
    },
    runtime: generateRuntime(),
    genres: generateGenres(),
    description: generateDescription(),
  },
  userDetails: {
    watchlist: getRandomBoolean(),
    alreadyWatched: getRandomBoolean(),
    watchingDate: Date.now(),
    favorite: getRandomBoolean(),
  },
  comments: generateComments(),
});
